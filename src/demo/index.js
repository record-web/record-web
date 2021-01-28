window.onload = function () {
  function getVirtualAttribute(tagName, attribute) {

  }

  function serializeNode(node) {
    switch (node.nodeType) {
      case node.DOCUMENT_NODE:
        return {
          type: "DOCUMENT_NODE",
          childNodes: [],
        };
      case node.DOCUMENT_TYPE_NODE:
        return {
          type: "DOCUMENT_TYPE_NODE",
          name: node.name,
          publicId: node.publicId,
          systemId: node.systemId,
        };
      case node.ELEMENT_NODE:
        const tagName = node.tagName.toLowerCase().trim();
        let attribute = {};
        for (const { name, value } of Array.from(node.attributes)) {
          attribute[name] = value;
        }
        getVirtualAttribute(tagName, attribute);
        return {
          type: "ELEMENT_NODE",
          childNodes: [],
          tagName,
          attribute,
        };
      case node.TEXT_NODE:
        let textContent = node.textContent.trim() || "";
        const parentTagName =
          node.parentNode && node.parentNode.tagName.toLowner;
        // style script 特殊处理
        const isStyle = parentTagName === "STYLE" ? true : false;
        return {
          type: "TEXT_NODE",
          textContent,
          isStyle,
        };
      case node.CDATA_SECTION_NODE:
        return {
          type: "CDATA_SECTION_NODE",
        };
      case node.COMMENT_NODE:
        return {
          type: "COMMENT_NODE",
        };
      default:
        return false;
    }
  }

  function serialize(node) {
    const _serializeData = serializeNode(node);
    if (!_serializeData) {
      return null;
    }
    const serializeData = Object.assign(_serializeData, {});
    if (
      serializeData.type === "DOCUMENT_NODE" ||
      serializeData.type === "ELEMENT_NODE"
    ) {
      for (const childNode of Array.from(node.childNodes)) {
        const serializeNode = serialize(childNode);
        if (serializeNode) {
          serializeData.childNodes.push(serializeNode);
        }
      }
    }
    return serializeData;
  }

  serialize(window.document);
};

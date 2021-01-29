// 判断是否需要隐藏，对于需要隐藏的元素用登内容的框表示
function isNeedHideElement(node, options) {
  const { hideClass, hideValue } = options;
  if (typeof hideClass === "string") {
    if (node.classList.contains(hideClass)) {
      return true;
    }
  } else {
    if (
      Array.from(node.classList).some((item) => hideClass.test(item) === true)
    ) {
      return true;
    }
  }
  return false;
}

// 对于不同类型元素进行处理
function getVirtualAttribute(
  tagName,
  attributes,
  { node, needHide, hideValue },
) {
  // if hide element use mask to replace, return block
  if (needHide) {
    return;
  }

  switch (tagName) {
    // link todo
    case "link":
      attributes.href = "";
      return attributes;
    // script todo
    case "script":
      attributes.href = "";
      return attributes;
    // get the result value
    case "input":
    case "select":
    case "textarea":
      attributes.href = "";
      return attributes;
    // get select value
    case "option":
      attributes.href = "";
      return attributes;
    // get data url
    case "canvas":
      attributes.href = "";
      return attributes;
    // pause or play
    case "video":
    case "audio":
      attributes.href = "";
      return attributes;
  }
}

function serializeNode(
  node,
  { doc = null, hideClass = null, hideValue = null },
) {
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
      let attributes = {};
      for (const { name, value } of Array.from(node.attributes)) {
        attributes[name] = value;
      }
      const needHid = isNeedHideElement(node, { hideClass, hideValue });
      getVirtualAttribute(tagName, attributes, { node, needHid, hideValue });
      return {
        type: "ELEMENT_NODE",
        childNodes: [],
        tagName,
        attributes,
      };
    case node.TEXT_NODE:
      const textContent = node.textContent.trim() || "";
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

function serialize(node, options) {
  const _serializeData = serializeNode(node, options);
  if (!_serializeData) {
    return null;
  }
  const serializeData = Object.assign(_serializeData, {});
  if (
    serializeData.type === "DOCUMENT_NODE" ||
    serializeData.type === "ELEMENT_NODE"
  ) {
    for (const childNode of Array.from(node.childNodes)) {
      const serializeNode = serialize(childNode, options);
      if (serializeNode) {
        serializeData.childNodes.push(serializeNode);
      }
    }
  }
  return serializeData;
}

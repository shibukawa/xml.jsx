/**
 * XML implementation in JSX
 *
 * [sample] This comment is document for class. You can use some HTML tags.
 *
 * @author shibukawa
 *
 * @see https://github.com/shibukawa/xml.jsx
 *
 * License: MIT
 */

import "sax.jsx";

/**
 * Simple interface to Document Object Model
 */

/** @see http://www.w3.org/TR/dom/ */
class DOMException extends Error
{
    static const INDEX_SIZE_ERR : int = 1; /*unsigned short*/
    static const DOMSTRING_SIZE_ERR : int = 2; /*unsigned short*/
    // historical
    static const HIERARCHY_REQUEST_ERR : int = 3; /*unsigned short*/
    static const WRONG_DOCUMENT_ERR : int = 4; /*unsigned short*/
    static const INVALID_CHARACTER_ERR : int = 5; /*unsigned short*/
    static const NO_DATA_ALLOWED_ERR : int = 6; /*unsigned short*/
    // historical
    static const NO_MODIFICATION_ALLOWED_ERR : int = 7; /*unsigned short*/
    static const NOT_FOUND_ERR : int = 8; /*unsigned short*/
    static const NOT_SUPPORTED_ERR : int = 9; /*unsigned short*/
    static const INUSE_ATTRIBUTE_ERR : int = 10; /*unsigned short*/
    // historical
    static const INVALID_STATE_ERR : int = 11; /*unsigned short*/
    static const SYNTAX_ERR : int = 12; /*unsigned short*/
    static const INVALID_MODIFICATION_ERR : int = 13; /*unsigned short*/
    static const NAMESPACE_ERR : int = 14; /*unsigned short*/
    static const INVALID_ACCESS_ERR : int = 15; /*unsigned short*/
    static const VALIDATION_ERR : int = 16; /*unsigned short*/
    // historical
    static const TYPE_MISMATCH_ERR : int = 17; /*unsigned short*/
    // historical; use TypeError instead
    static const SECURITY_ERR : int = 18; /*unsigned short*/
    static const NETWORK_ERR : int = 19; /*unsigned short*/
    static const ABORT_ERR : int = 20; /*unsigned short*/
    static const URL_MISMATCH_ERR : int = 21; /*unsigned short*/
    static const QUOTA_EXCEEDED_ERR : int = 22; /*unsigned short*/
    static const TIMEOUT_ERR : int = 23; /*unsigned short*/
    static const INVALID_NODE_TYPE_ERR : int = 24; /*unsigned short*/
    static const DATA_CLONE_ERR : int = 25; /*unsigned short*/

    var code : int; /*unsigned short*/
    function constructor(name : string, code : int, message : string)
    {
        super(message);
        this.code = code;
    }
} // end of DOMException

/** @see http://www.w3.org/TR/dom/ */
class DOMError
{
    var name : string/*DOMString*/;

} // end of DOMError

/** @see http://www.w3.org/TR/dom/ */
class Node
{
    static const ELEMENT_NODE : int = 1/*unsigned short*/;
    static const ATTRIBUTE_NODE : int = 2/*unsigned short*/;
    // historical
    static const TEXT_NODE : int = 3/*unsigned short*/;
    static const CDATA_SECTION_NODE : int = 4/*unsigned short*/;
    // historical
    static const ENTITY_REFERENCE_NODE : int = 5/*unsigned short*/;
    // historical
    static const ENTITY_NODE : int = 6/*unsigned short*/;
    // historical
    static const PROCESSING_INSTRUCTION_NODE : int = 7/*unsigned short*/;
    static const COMMENT_NODE : int = 8/*unsigned short*/;
    static const DOCUMENT_NODE : int = 9/*unsigned short*/;
    static const DOCUMENT_TYPE_NODE : int = 10/*unsigned short*/;
    static const DOCUMENT_FRAGMENT_NODE : int = 11/*unsigned short*/;
    static const NOTATION_NODE : int = 12/*unsigned short*/;
    // historical
    function constructor ()
    {
        this._nodeType = 0;
        this._childNodes = [] : Node[];
    }

    var _nodeType : int;
    function nodeType() : int/*unsigned short*/
    {
        return this._nodeType;
    }
    var _nodeName : string;
    function nodeName() : string/*DOMString*/
    {
        return this._nodeName;
    }
    //var baseURI : Nullable.<string>/*DOMString?*/;
    var _ownerDocument : Nullable.<Document>;
    function ownerDocument () : Nullable.<Document>
    {
        return this._ownerDocument;
    }
    var _parentNode : Nullable.<Node>;
    function parentNode () : Nullable.<Node>
    {
        return this._parentNode;
    }
    function parentElement () : Nullable.<Element>
    {
        if (this._parentNode instanceof Element)
        {
            return this._parentNode as Element;
        }
        else
        {
            return null;
        }
    }
    var _childNodes : Node[];
    function hasChildNodes() : boolean
    {
        return (this._childNodes.length > 0);
    }
    function childNodes () : Node[]
    {
        return this._childNodes;
    }
    function firstChild () : Nullable.<Node>
    {
        return this._childNodes[0];
    }
    function lastChild () : Nullable.<Node>
    {
        if (this._childNodes.length == 0)
        {
            return null;
        }
        return this._childNodes[this._childNodes.length - 1];
    }
    function previousSibling () : Nullable.<Node>
    {
        if (!this._parentNode)
        {
            throw new Error("The this node doesn't have parent node.");
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        if (index == 0)
        {
            return null;
        }
        return siblings[index - 1];
    }
    function nextSibling () : Nullable.<Node>
    {
        if (!this._parentNode)
        {
            throw new Error("The this node doesn't have parent node.");
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        if (index == (siblings.length - 1))
        {
            return null;
        }
        return siblings[index + 1];
    }
    var _nodeValue : Nullable.<string>/*DOMString?*/;
    function nodeValue () : Nullable.<string>/*DOMString?*/
    {
        return this._nodeValue;
    }
    function _textContent (result : string[]) : void/*DOMString?*/
    {
        for (var i = 0; i < this._childNodes.length; i++)
        {
            this._childNodes[i]._textContent(result);
        }
    }
    function textContent () : Nullable.<string>/*DOMString?*/
    {
        var result = [] : string[];
        this._textContent(result);
        if (result.length == 0)
        {
            return null;
        }
        return result.join('');
    }
    function _onlyTextNode (checkAll : boolean = false) : boolean
    {
        for (var i = 0; i < this._childNodes.length; i++)
        {
            if (!this._childNodes[i]._onlyTextNode(true))
            {
                return false;
            }
        }
        if (!checkAll)
        {
            return true;
        }
        return (this instanceof Text);
    }

    function insertBefore(node : Node, child : Nullable.<Node>) : Node
    {
        var index = this._childNodes.indexOf(child);
        if (index == -1)
        {
            this._childNodes.unshift(node);
        }
        else
        {
            this._childNodes.splice(index, 0, node);
        }
        node._parentNode = this;
        return node;
    }

    function appendChild(node : Node) : Node
    {
        this._childNodes.push(node);
        node._parentNode = this;
        return node;
    }
    function replaceChild(newNode : Node, oldNode : Node) : Node
    {
        var index = this._childNodes.indexOf(oldNode);
        if (index == -1)
        {
            throw new Error('The oldChild is not a child of this node.');
        }
        this._childNodes[index] = newNode;
        oldNode._parentNode = null;
        return oldNode;
    }
    function removeChild(child : Node) : Node
    {
        var index = this._childNodes.indexOf(child);
        if (index == -1)
        {
            throw new Error('The oldChild is not a child of this node.');
        }
        this._childNodes.splice(index, 1);
        child._parentNode = null;
        return child;
    }
    //function normalize() : void;
    //function cloneNode(deep : boolean = false) : Node;
    //function isEqualNode(node : Nullable.<Node>) : boolean;
    //static const DOCUMENT_POSITION_DISCONNECTED : int = 0x01/*unsigned short*/;
    //static const DOCUMENT_POSITION_PRECEDING : int = 0x02/*unsigned short*/;
    //static const DOCUMENT_POSITION_FOLLOWING : int = 0x04/*unsigned short*/;
    //static const DOCUMENT_POSITION_CONTAINS : int = 0x08/*unsigned short*/;
    //static const DOCUMENT_POSITION_CONTAINED_BY : int = 0x10/*unsigned short*/;
    //static const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : int = 0x20/*unsigned short*/;
    //function compareDocumentPosition(other : Node) : int/*unsigned short*/;
    //function contains(other : Nullable.<Node>) : boolean;
    //function lookupPrefix(namespace : Nullable.<string>/*DOMString?*/) : Nullable.<string>/*DOMString?*/;
    //function lookupNamespaceURI(prefix : Nullable.<string>/*DOMString?*/) : Nullable.<string>/*DOMString?*/;
    //function isDefaultNamespace(namespace : Nullable.<string>/*DOMString?*/) : boolean;

} // end of Node

/** @see http://www.w3.org/TR/dom/ */
class Document extends Node {

    //var implementation : DOMImplementation;
    //var URL : string/*DOMString*/;
    //var documentURI : string/*DOMString*/;
    //var compatMode : string/*DOMString*/;
    //var characterSet : string/*DOMString*/;
    //var contentType : string/*DOMString*/;
    //var doctype : Nullable.<DocumentType>;

    var _ids : Map.<Element>;
    var _documentElement : Nullable.<Element>;

    function constructor () {
        super();
        this._ids = {} : Map.<Element>;
        this._documentElement = null;
    }

    function documentElement () : Nullable.<Element>
    {
        return this._documentElement;
    }

    function getElementsByTagName(localName : string/*DOMString*/) : Node[]
    {
        if (!this._documentElement)
        {
            return [] : Node[];
        }
        return this._documentElement.getElementsByTagName(localName);
    }

    //function getElementsByTagNameNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : Node[];
    function getElementsByClassName(classNames : string/*DOMString*/) : Node[]
    {
        if (!this._documentElement)
        {
            return [] : Node[];
        }
        return this._documentElement.getElementsByClassName(classNames);
    }

    function getElementById(elementId : string/*DOMString*/) : Nullable.<Element>
    {
        if (this._ids.hasOwnProperty(elementId))
        {
            return this._ids[elementId];
        }
        return null;
    }

    function createElement(localName : string/*DOMString*/) : Element
    {
        var element = new Element();
        element._ownerDocument = this;
        element._tagName = localName;
        return element;
    }

    //function createElementNS(namespace : Nullable.<string>/*DOMString?*/, qualifiedName : string/*DOMString*/) : Element;
    //function createDocumentFragment() : DocumentFragment;
    function createTextNode(data : string/*DOMString*/) : Text
    {
        var text = new Text();
        text._ownerDocument = this;
        text._nodeType = Node.TEXT_NODE;
        text._nodeValue = data;
        return text;
    }
    function createComment(data : string/*DOMString*/) : Comment
    {
        var comment = new Comment();
        comment._ownerDocument = this;
        comment._nodeValue = data;
        return comment;
    }
    //function createProcessingInstruction(target : string/*DOMString*/, data : string/*DOMString*/) : ProcessingInstruction;
    //function importNode(node : Node) : Node;
    //function importNode(node : Node, deep : boolean) : Node;
    //function adoptNode(node : Node) : Node;

    /** @see http://www.w3.org/TR/selectors-api/ */
    //function querySelector(selectors : string/*DOMString*/) : Nullable.<Element>;
    /** @see http://www.w3.org/TR/selectors-api/ */
    //function querySelectorAll(selectors : string/*DOMString*/) : Node[];
    override function appendChild(node : Node) : Node
    {
        super.appendChild(node);
        this._documentElement = node as Element;
        return node;
    }

} // end of Document

/** @see http://www.w3.org/TR/dom/ */
class Element extends Node
{
    var _classList : string[];
    var _attributes : Map.<string>;
    var _id : Nullable.<string>;
    var _tagName : string;

    function constructor()
    {
        this._classList = [] : string[];
        this._attributes = {} : Map.<string>;
        this._nodeType = Node.ELEMENT_NODE;
        this._id = null;
    }

    //var namespaceURI : Nullable.<string>/*DOMString?*/;
    //var prefix : Nullable.<string>/*DOMString?*/;
    function localName () : string/*DOMString*/
    {
        return this._tagName;
    }
    function tagName () : string
    {
        return this._tagName;
    }
    function id () : Nullable.<string>
    {
        return this._id;
    }

    function className () : string/*DOMString*/
    {
        return this._classList.join('');
    }

    function classList () : string[]
    {
        return this._classList;
    }

    function attributes() : Attr[]
    {
        var result = [] : Attr[];
        for (var key in this._attributes)
        {
            if (this._attributes.hasOwnProperty(key))
            {
                var attr = new Attr();
                attr.name = key;
                attr.value = this._attributes[key];
                result.push(attr);
            }
        }
        return result;
    }

    function getAttribute(name : string/*DOMString*/) : Nullable.<string>/*DOMString?*/
    {
        return this._attributes[name];
    }

    //function getAttributeNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : Nullable.<string>/*DOMString?*/;
    function setAttribute(name : string/*DOMString*/, value : string/*DOMString*/) : void
    {
        this._attributes[name] = value;
        if (name == 'id')
        {
            if (this._id != null)
            {
                delete this._ownerDocument._ids[this._id];
            }
            this._id = value;
            this._ownerDocument._ids[this._id] = this;
        }
        else if (name == 'class')
        {
            this._classList = value.split(/\s+/);
        }
    }
    //function setAttributeNS(namespace : Nullable.<string>/*DOMString?*/, name : string/*DOMString*/, value : string/*DOMString*/) : void;
    function removeAttribute(name : string/*DOMString*/) : void
    {
        delete this._attributes[name];
    }
    //function removeAttributeNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : void;
    function hasAttribute(name : string/*DOMString*/) : boolean
    {
        return this._attributes[name] as boolean;
    }
    //function hasAttributeNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : boolean;
    function getElementsByTagName(localName : string/*DOMString*/) : Node[]
    {
        var result = [] : Node[];
        for (var i = 0; i < this._childNodes.length; i++)
        {
            if (this._childNodes[i] instanceof Element)
            {
                var element = this._childNodes[i] as Element;
                if (element.tagName() == localName)
                {
                    result.push(element);
                }
                result = result.concat(element.getElementsByTagName(localName));
            }
        }
        return result;
    }
    //function getElementsByTagNameNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : Node[];
    function getElementsByClassName(classNames : string/*DOMString*/) : Node[]
    {
        var result = [] : Node[];
        for (var i = 0; i < this._childNodes.length; i++)
        {
            if (this._childNodes[i] instanceof Element)
            {
                var element = this._childNodes[i] as Element;
                if (element.classList().indexOf(classNames) != -1)
                {
                    result.push(element);
                }
                result = result.concat(element.getElementsByClassName(classNames));
            }
        }
        return result;
    }

    //function getElementsByTagNameNS(namespace : Nullable.<string>/*DOMString?*/, localName : string/*DOMString*/) : Node[];

    function firstElementChild () : Nullable.<Element>
    {
        for (var i = 0; i < this._childNodes.length; i++)
        {
            if (this._childNodes[i] instanceof Element)
            {
                return this._childNodes[i] as Element;
            }
        }
        return null;
    }

    function lastElementChild () : Nullable.<Element>
    {
        for (var i = this._childNodes.length - 1; i > -1; i--)
        {
            if (this._childNodes[i] instanceof Element)
            {
                return this._childNodes[i] as Element;
            }
        }
        return null;
    }

    function previousElementSibling () : Nullable.<Node>
    {
        if (!this._parentNode)
        {
            throw new Error("The this node doesn't have parent node.");
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        if (index == 0)
        {
            return null;
        }
        for (var i = index - 1; i > -1; i--)
        {
            if (siblings[i] instanceof Element)
            {
                return siblings[i] as Element;
            }
        }
        return null;
    }
    function nextElementSibling () : Nullable.<Element>
    {
        if (!this._parentNode)
        {
            throw new Error("The this node doesn't have parent node.");
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        if (index == (siblings.length - 1))
        {
            return null;
        }
        for (var i = index + 1; i < siblings.length; i++)
        {
            if (siblings[i] instanceof Element)
            {
                return siblings[i] as Element;
            }
        }
        return null;
    }
    // NEW
    function prepend(node : Node) : void
    {
        this.prepend([node]);
    }
    function prepend(nodes : Node[]) : void
    {
        for (var i = nodes.length - 1; i > -1; i--)
        {
            this._childNodes.unshift(nodes[i]);
            nodes[i]._parentNode = this;
        }
    }
    //function prepend(...nodes : string/*DOMString*/) : void;
    function append(node : Node) : void
    {
        this.append([node]);
    }
    function append(nodes : Node[]) : void
    {
        for (var i = 0; i < nodes.length; i++)
        {
            this._childNodes.push(nodes[i]);
            nodes[i]._parentNode = this;
        }
    }
    //function append(...nodes : string/*DOMString*/) : void;
    function before(node : Node) : void
    {
        this.before([node]);
    }
    function before(nodes : Node[]) : void
    {
        if (!this._parentNode)
        {
            return;
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        for (var i = nodes.length - 1; i > -1; i--)
        {
            siblings.splice(index, 0, nodes[i]);
            nodes[i]._parentNode = this._parentNode;
        }
    }
    //function before(...nodes : string/*DOMString*/) : void;
    function after(node : Node) : void
    {
        this.after([node]);
    }
    function after(nodes : Node[]) : void
    {
        if (!this._parentNode)
        {
            return;
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this) + 1;
        for (var i = nodes.length - 1; i > -1; i--)
        {
            siblings.splice(index, 0, nodes[i]);
            nodes[i]._parentNode = this._parentNode;
        }
    }
    //function after(...nodes : string/*DOMString*/) : void;
    function replace(node : Node) : void
    {
        this.replace([node]);
    }
    function replace(nodes : Node[]) : void
    {
        if (!this._parentNode)
        {
            return;
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        siblings.splice(index, 1);
        for (var i = nodes.length - 1; i > -1; i--)
        {
            siblings.splice(index, 0, nodes[i]);
            nodes[i]._parentNode = this._parentNode;
        }
        this._parentNode = null;
    }
    //function replace(...nodes : string/*DOMString*/) : void;
    function remove() : void
    {
        if (!this._parentNode)
        {
            return;
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        siblings.splice(index, 1);
        this._parentNode = null;
    }

} // end of Element

/** @see http://www.w3.org/TR/dom/ */
class Attr {

    var name : string/*DOMString*/;
    var value : string/*DOMString*/;
    var namespaceURI : Nullable.<string>/*DOMString?*/;
    var prefix : Nullable.<string>/*DOMString?*/;
    var localName : string/*DOMString*/;

} // end of Attr

/** @see http://www.w3.org/TR/dom/ */
class CharacterData extends Node {

    function data () : string
    {
        if (this._nodeValue == null)
        {
            return '';
        }
        return this._nodeValue;
    }
    function length () : int
    {
        if (this._nodeValue == null)
        {
            return 0;
        }
        return this._nodeValue.length;
    }
    //function substringData(offset : number/*unsigned long*/, count : number/*unsigned long*/) : string/*DOMString*/;
    //function appendData(data : string/*DOMString*/) : void;
    //function insertData(offset : number/*unsigned long*/, data : string/*DOMString*/) : void;
    //function deleteData(offset : number/*unsigned long*/, count : number/*unsigned long*/) : void;
    //function replaceData(offset : number/*unsigned long*/, count : number/*unsigned long*/, data : string/*DOMString*/) : void;
    //// NEW
    //function before(nodes : Node[]) : void;
    //function before(nodes : string/*DOMString*/) : void;
    //function after(nodes : Node[]) : void;
    //function after(nodes : string/*DOMString*/) : void;
    //function replace(nodes : Node[]) : void;
    //function replace(nodes : string/*DOMString*/) : void;
    //function remove() : void;
} // end of CharacterData


/** @see http://www.w3.org/TR/dom/ */
class Text extends CharacterData
{
    function constructor()
    {
        this._nodeType = Node.TEXT_NODE;
    }

    override function _textContent (result : string[]) : void
    {
        result.push(this.data());
        super._textContent(result);
    }

    //function splitText(offset : int/*unsigned long*/) : Text;
    function wholeText () : string/*DOMString*/
    {
        if (!this._parentNode)
        {
            return '';
        }
        var siblings = this._parentNode._childNodes;
        var index = siblings.indexOf(this);
        for (var startIndex = index - 1; startIndex > -1; startIndex--)
        {
            if (!siblings[startIndex] instanceof Text)
            {
                break;
            }
        }
        for (var endIndex = index + 1; endIndex < siblings.length; ++endIndex)
        {
            if (!siblings[endIndex] instanceof Text)
            {
                break;
            }
        }
        var result = [] : string[];
        for (var i = startIndex + 1; i < endIndex; i++)
        {
            result.push((siblings[i] as Text).data());
        }
        return result.join('');
    }

    /** @see http://www.w3.org/TR/DOM-Parsing/ */
    var serializeAsCDATA : boolean;

} // end of Text

/** @see http://www.w3.org/TR/dom/ */
class ProcessingInstruction extends CharacterData {

    var target : string/*DOMString*/;

    // implements LinkStyle

} // end of ProcessingInstruction

/** @see http://www.w3.org/TR/dom/ */
class Comment extends CharacterData {
    function constructor()
    {
        this._nodeType = Node.COMMENT_NODE;
    }
}

/** @see http://www.w3.org/TR/DOM-Parsing/ */
class DOMParser
{
    static function parseFromString(str : string/*DOMString*/, type : string/*SupportedType*/ = 'text/xml') : Document
    {
        var document = new Document;
        var handler = new _Handler(document);
        var parser = new SAXParser(handler);
        parser.parse(str);
        return document;
    }
} // end of DOMParser

/** @see http://www.w3.org/TR/DOM-Parsing/ */
class XMLSerializer
{
    static var _indentCache = {} : Map.<string>;

    static function serializeToString(root : Node, indent : Nullable.<int> = null) : string/*DOMString*/
    {
        if (root instanceof Document)
        {
            root = (root as Document).documentElement();
        }
        var result = [] : string[];
        XMLSerializer._serializeToString(result, root, 0, indent);
        if (indent == null)
        {
            return result.join('');
        }
        else
        {
            return result.join('\n');
        }
    }

    static function _indent (depth : int, indent : Nullable.<int>) : string
    {
        if (indent == null || depth == 0)
        {
            return '';
        }
        var length = depth * indent;
        if (XMLSerializer._indentCache.hasOwnProperty(length as string))
        {
            return XMLSerializer._indentCache[length as string];
        }
        var result = [] : string[];
        for (var i = 0; i < length; i++)
        {
            result.push(' ');
        }
        var resultString = result.join('');
        XMLSerializer._indentCache[length as string] = resultString;
        return resultString;
    }

    static function _serializeToString(result : string[], node : Node, depth : int, indent : Nullable.<int>) : void
    {
        var children = node._childNodes;
        if (children.length == 0)
        {
            var content = [XMLSerializer._indent(depth, indent)] : string[];
            if (node instanceof Text)
            {
                content.push((node as Text).data());
            }
            else if (node instanceof Comment)
            {
                content.push('<!-- ', (node as Text).data(), '-->');
            }
            else
            {
                content.push(XMLSerializer._dumpTag(node as Element) + ' />');
            }
            result.push(content.join(''));
        }
        else if (node._onlyTextNode())
        {
            var element = node as Element;
            result.push(XMLSerializer._indent(depth, indent) + XMLSerializer._dumpTag(element) + '>' + node.textContent() + '</' + element.tagName() + '>');
        }
        else
        {
            var element = node as Element;
            result.push(XMLSerializer._indent(depth, indent) + XMLSerializer._dumpTag(element) + '>');
            for (var i = 0; i < node._childNodes.length; i++)
            {
                XMLSerializer._serializeToString(result, node._childNodes[i], depth + 1, indent);
            }
            result.push(XMLSerializer._indent(depth, indent) + '</' + element.tagName() + '>');
        }
    }

    static function _dumpTag(element : Element) : string
    {
        var elementSource = ['<' + element.tagName()] : string[];
        for (var key in element._attributes)
        {
            if (element._attributes.hasOwnProperty(key))
            {
                elementSource.push(key + '="' + element._attributes[key] + '"');
            }
        }
        return elementSource.join(' ');
    }
} // end of XMLSerializer


class _Handler extends SAXHandler
{
    var document : Document;
    var currentNode : Node;
    function constructor(document : Document)
    {
        this.document = document;
        this.currentNode = this.document;
    }
    override function onerror (error : Error) : void
    {
    }
    override function ontext (text : string) : void
    {
        var tag = this.document.createTextNode(text);
        this.currentNode.appendChild(tag);
    }
    override function ondoctype (doctype : string) : void
    {
    }
    override function onprocessinginstruction (name : string, body : string) : void
    {
    }
    override function onsgmldeclaration (sgmlDecl : string) : void
    {
    }
    override function onopentag (tagname : string, attributes : Map.<string>) : void
    {
        var tag = this.document.createElement(tagname);
        this.currentNode.appendChild(tag);
        this.currentNode = tag;
        for (var key in attributes)
        {
            if (attributes.hasOwnProperty(key))
            {
                tag.setAttribute(key, attributes[key]);
            }
        }
    }
    override function onclosetag (tagname : string) : void
    {
        this.currentNode = this.currentNode.parentElement();
    }
    override function onattribute (name : string, value : string) : void
    {
    }
    override function oncomment (comment : string) : void
    {
        var tag = this.document.createComment(comment);
        this.currentNode.appendChild(tag);
    }
    override function onopencdata () : void
    {
    }
    override function oncdata (cdata : string) : void
    {
    }
    override function onclosecdata () : void
    {
    }
    override function onend () : void
    {
    }
    override function onready () : void
    {
    }
    override function onscript (script : string) : void
    {
    }
}

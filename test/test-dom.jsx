import "test-case.jsx";
import "dom.jsx";

class _Test extends TestCase
{
    function test_parseSimpleXML() : void
    {
        var dom = DOMParser.parseFromString('<Hello>World</Hello>');
        this.expect(dom instanceof Document).toBe(true);
        var root = dom.documentElement();
        this.expect(root.tagName()).toBe('hello');
        var text = root.firstChild();
        this.expect((text as Text).data()).toBe('World');
    }

    function test_textContent() : void
    {
        var dom = DOMParser.parseFromString('<parent><child>Hello</child><child>World</child></parent>');
        this.expect(dom.textContent()).toBe('HelloWorld');
    }

    function test_getElementById() : void
    {
        var dom = DOMParser.parseFromString('<parent><child>Hello</child><child id="world">World</child></parent>');
        this.expect(dom.getElementById('world').textContent()).toBe('World');
    }
    
    function test_serialize_1() : void
    {
        var source = '<element />';
        var dom = DOMParser.parseFromString(source);
        this.expect(XMLSerializer.serializeToString(dom)).toBe(source);
    }

    function test_serialize_2() : void
    {
        var source = '<element attr="true" />';
        var dom = DOMParser.parseFromString(source);
        this.expect(XMLSerializer.serializeToString(dom)).toBe(source);
    }

    function test_serialize_3() : void
    {
        var source = '<parent><child>Hello</child><child id="world">World</child></parent>';
        var dom = DOMParser.parseFromString(source);
        this.expect(XMLSerializer.serializeToString(dom)).toBe(source);
    }
}

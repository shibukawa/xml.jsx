import "test-case.jsx";
import "dom.jsx";

class _Test extends TestCase
{
    function test_parseSimpleXML() : void
    {
        var dom = DOMParser.parseFromString('<Hello>World</Hello>');
        this.expect(dom instanceof Document).toBe(true);
        var root = dom.documentElement();
        this.expect(root.tagName()).toBe('Hello');
        var text = root.firstChild();
        this.expect((text as Text).data()).toBe('World');
    }

    function test_textContent() : void
    {
        var dom = DOMParser.parseFromString('<parent><child>Hello</child><child>World</child></parent>');
        this.expect(dom.textContent()).toBe('HelloWorld');
    }
}

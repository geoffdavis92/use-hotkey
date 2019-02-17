import * as React from "react";
import Enzyme, { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mountToJson as toJSON } from "enzyme-to-json";
import useHotkey from "../src/index";

// @ts-ignore
configure({ adapter: new Adapter() });

function returnsArg(arg) {
  return arg
}

describe("Test useHotkey", () => {
  it("should just work", () => {
    expect(true);
  });
  let b = "foo";
  const HTRef = React.createRef();
  const HotkeyTest = () => {
    if (HTRef.current) {
      const queryRoot = React.useRef(HTRef);
      useHotkey(queryRoot.current);
    }
    return (
      <div ref={HTRef}>
        <button
          onClick={e => {
            b = "bar";
          }}
          data-hotkey="a b"
        >
          Test Hotkey
        </button>
      </div>
    );
  };

  it("Renders component with useHotkey", () => {
    const component = mount(<HotkeyTest />);
    // @ts-ignore
    let tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });

  it("Should fire onClick", () => {
    const component = mount(<HotkeyTest />);
    const getButton = () => component.find("button");
    getButton().simulate("click");
  });
});

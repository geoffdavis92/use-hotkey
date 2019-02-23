import * as React from "react";
import { act } from "react-dom/test-utils";
import Enzyme, { configure, mount } from "enzyme";
import jestMock from "jest-mock";
import Adapter from "enzyme-adapter-react-16";
import { mountToJson as toJSON } from "enzyme-to-json";
import useHotkey from "../src/index";
import { mocked } from "ts-jest/dist/util/testing";

configure({ adapter: new Adapter() });

function KeydownLibrary(keysArr = [], d = document) {
  this.keydownEvents = {};
  this.dispatch = key => {
    act(() => {
      d.dispatchEvent(this.keydownEvents[key]);
    });
  };
  keysArr.forEach(key => {
    const e = new KeyboardEvent("keydown", { key });
    this.keydownEvents[key] = e;
  });
  return this;
}

function returnsArg(arg) {
  return arg;
}

describe("Test useHotkey", () => {
  it("should just work", () => {
    expect(true);
  });

  let b = 0;
  const HTRef = React.createRef();
  const HotkeyTest = ({ fn }) => {
    if (HTRef.current) {
      const queryRoot = HTRef.current; //React.useRef(HTRef);

      act(() => {
        useHotkey(queryRoot, undefined);
      });
    }
    return (
      <div ref={HTRef}>
        <button
          onClick={() => {
            b = fn();
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
    let tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });

  it("Should fire onClick", () => {
    const mockedReturnsArgs = jest.fn(returnsArg);
    const component = mount(<HotkeyTest fn={() => mockedReturnsArgs(b + 1)} />);
    const keydownEvents = new KeydownLibrary(["a", "b"]);
    const getButton = () => component.find("button");

    getButton().simulate("click");
    expect(mockedReturnsArgs).toBeCalledTimes(1);
    expect(b).toBe(1);

    // window.addEventListener("keydown", ({ key }) => console.log({ key }));

    // act(() => {
    //   window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    // });
    // act(() => {
    //   window.dispatchEvent(new KeyboardEvent("keydown", { key: "b" }));
    // });
    // expect(mockedReturnsArgs).toBeCalledTimes(2);
  });
});

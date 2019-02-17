import { useEffect } from "react";
import { install, uninstall } from "@github/hotkey";
import { DocOrElement } from "./types.d";

export default function useHotkey(
  queryRoot: DocOrElement = document,
  toChangeArray: any[] = []
) {
  useEffect(function useHotkeyInit(): () => void {
    const hotKeys: HTMLElement[] = Array.from(
      queryRoot.querySelectorAll("[data-hotkey]")
    );

    for (const el of hotKeys) {
      install(el);
    }

    return function useHotkeyCleanup(): void {
      for (const el of hotKeys) {
        uninstall(el);
      }
    };
  }, toChangeArray);
}

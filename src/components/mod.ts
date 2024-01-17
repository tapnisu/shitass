import archpackageSelect from "@components/archpackageSelect.ts";
import refreshArchpackage from "@components/refreshArchpackage.ts";
import { TaprisComponent } from "@framework/mod.ts";
import { Collection } from "harmony/mod.ts";
import delete_message from "./deleteMessage.ts";

export const components = [
  delete_message,
  archpackageSelect,
  refreshArchpackage,
];

/**
 * Create a collection of components
 */
export class ComponentsCollection extends Collection<RegExp, TaprisComponent> {
  /**
   * Create a collection of components
   * @param components array of components to set to collection
   */
  constructor(components: TaprisComponent[]) {
    super();

    components.forEach((component) => this.set(component.customId, component));
  }
}

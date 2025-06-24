import $ from "jquery";
import "jquery-ui/ui/widgets/sortable";

export function setupDraggable() {
  $(".child-list").sortable({
    revert: true,
    items: "> li.child",
    connectWith: ".child-list",
  });
}

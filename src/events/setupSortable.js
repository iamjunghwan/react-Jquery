import $ from "jquery";

import "jquery-ui/ui/widgets/sortable";

export function setupSortable() {
  $(".parent > ul").each(function () {
    const parentId = $(this).closest(".parent").attr("id");
    $(this).sortable({
      accept: `.child[data-parent='${parentId}']`,
      drop: function (event, ui) {
        const $droppedItem = ui.sortable;
        const $ul = $(this);
        console.log("$ul : ", $ul);
        $ul.append($droppedItem.css({ top: 0, left: 0 }));
        $droppedItem.attr("data-parent", parentId);
        $ul.append($ul.find(".add-child"));
      },
    });
  });
}

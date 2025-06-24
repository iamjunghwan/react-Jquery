import $ from "jquery";

export function bindCommonHandlers() {
  $(".parent-header")
    .off("click")
    .on("click", function () {
      $(this).next(".child-list").slideToggle(200);
    });
}

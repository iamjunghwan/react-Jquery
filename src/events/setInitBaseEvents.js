/**
 *
 *  모델 텍스트 더블 클릭 및 수정 버튼 클릭시 이벤트들
 *
 *
 */

import $ from "jquery";

import { setupSortable } from "./setupSortable";
import { setupDraggable } from "./setupDraggable";

export function setInitBaseEvents() {
  $(".parent-header").each(function () {
    if ($(this).find(".arrow").length === 0) {
      $(this).append(' <span class="arrow">🔼</span>');
    }
  });

  // 클릭 이벤트
  $(".parent-header").on("click", function () {
    const $parent = $(this).closest(".parent");
    const $childList = $parent.find(".child-list");
    const $arrow = $(this).find(".arrow");

    // 현재 열려있는 다른 항목들 닫기
    $(".child-list").not($childList).slideUp();
    $(".arrow").not($arrow).text("🔼");

    // 현재 항목이 닫혀 있으면 열기
    if (!$childList.is(":visible")) {
      $childList.slideDown();
    } else {
      $arrow.text("🔽");
    }
  });

  // $(".parent-header").on("click", function () {
  //   const $parent = $(this).closest(".parent");
  //   const $childList = $parent.find(".child-list");
  //   const $arrow = $(this).find(".arrow");

  //   // 다른 항목 모두 닫기 (하나만 열리게 하려면)
  //   $(".child-list").not($childList).slideUp();
  //   $(".arrow").not($arrow).text("🔼");

  //   // toggle this one
  //   if ($childList.is(":visible")) {
  //     $childList.slideUp();
  //     $arrow.text("🔼");
  //   } else {
  //     $childList.slideDown();
  //     $arrow.text("🔽");
  //   }
  // });

  $("#parent-sortable").sortable({
    handle: ".parent-header", // 드래그할 핸들 지정
    placeholder: "parent-placeholder",
  });

  // $(".child").on("dblclick", function (e) {
  //   const $li = $(this);
  //   editChildInline($li);
  // });
  $(document).on("dblclick", ".child", function () {
    const $li = $(this);
    editChildInline($li);
  });
  // $(".edit-btn").on("click", function (e) {
  //   e.stopPropagation();
  //   const $li = $(this).closest(".child");
  //   editChildInline($li);
  // });
  $(document).on("click", ".edit-btn", function (e) {
    e.stopPropagation();
    const $li = $(this).closest(".child");
    editChildInline($li);
  });
  function editChildInline($li) {
    console.log($li);
    // 텍스트 추출 (텍스트 노드 또는 <span>)
    let $textNode = $li
      .contents()
      .filter(function () {
        return this.nodeType === 3; // 텍스트 노드만 가져오기
      })
      .first();

    if (!$textNode.length) {
      $textNode = $li.find("span").first();
    }

    const originalText = $textNode.text().trim(); // 텍스트 노드 빈칸 삭제

    // 중복 방지
    if ($li.find("input").length > 0) return;

    // 인풋 필드 생성 및 포커스
    const $input = $('<input type="text" class="edit-input">')
      .val(originalText)
      .appendTo($li.empty())
      .focus();

    // 즐겨찾기 여부 (기본값은 "★")
    const isFavorite = $li.data("isFavorite") === "Y" ? "⭐️" : "★";

    $input.on("blur keyup", function (e) {
      if (e.type === "blur" || e.key === "Enter") {
        const newText = $input.val().trim() || originalText;
        $li.empty().append(document.createTextNode(newText));
        $li.append(`
              <button class="favorite-btn">${isFavorite}</button>
              <button class="edit-btn">✎</button>
              <button class="delete-btn">🗑️</button>
            `);
        setupDraggable(); // 한 부모 안에서만 li 드롭 가능하게
        setupSortable();
      }
    });
  }
}

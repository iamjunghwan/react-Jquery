// // data-parent 설정
// export function setupDataParent() {
//   $(".parent > ul > li.child").each(function () {
//     const parentId = $(this).closest(".parent").attr("id");
//     $(this).attr("data-parent", parentId);
//   });
// }

// // droppable 설정
// export function setupDroppable() {
//   $(".parent > ul").each(function () {
//     const parentId = $(this).closest(".parent").attr("id");
//     $(this).droppable({
//       accept: `.child[data-parent='${parentId}']`,
//       drop: function (event, ui) {
//         const $droppedItem = ui.draggable;
//         const $ul = $(this);

//         $ul.append($droppedItem); // 자식 추가
//         $droppedItem.css({ top: 0, left: 0 }); // 위치 초기화
//         $droppedItem.attr("data-parent", parentId); // 부모 설정

//         // 💡 항상 add-child li는 맨 아래로 이동
//         const $addChild = $ul.find(".add-child");
//         if ($addChild.length) {
//           $ul.append($addChild);
//         }
//       },
//     });
//   });
// }

// // draggable 설정
// export function setupDraggable() {
//   $(".parent > ul > li.child").draggable({
//     helper: "clone",
//     revert: "invalid",
//   });
// }

// // 새로 추가된 li에 draggable 적용
// export function applyDraggableToNewItem($newLi) {
//   $newLi.draggable({
//     helper: "clone",
//     revert: "invalid",
//   });
// }

// // 함수로 분리하여 재귀적으로 이벤트 재적용
// export function bindAddChildHandlers() {
//   $(".add-child")
//     .off("click")
//     .on("click", function () {
//       const $this = $(this);
//       const parentId = $this.data("parent");

//       const $form = $(`
//         <li class="add-form">
//           <input type="text" placeholder="모델 이름 입력" class="model-input" />
//           <button class="confirm-add">추가</button>
//           <button class="cancel-add">취소</button>
//         </li>
//       `);

//       $this.replaceWith($form);

//       $form.find(".confirm-add").on("click", function () {
//         const modelName = $form.find(".model-input").val().trim();
//         if (!modelName) {
//           alert("모델 이름을 입력하세요.");
//           return;
//         }

//         const $newLi = $(`
//           <li class="child" data-parent="${parentId}">
//             ${modelName}
//             <span class="actions">
//               <button>★</button>
//               <button>✎</button>
//               <button>🗑️</button>
//             </span>
//           </li>
//         `);

//         $form.before($newLi);
//         $form.replaceWith(`
//           <li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>
//         `);

//         applyDraggableToNewItem($newLi);
//         bindAddChildHandlers();
//       });

//       $form.find(".cancel-add").on("click", function () {
//         $form.replaceWith(`
//           <li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>
//         `);
//         bindAddChildHandlers();
//       });
//     });
// }

// export function bindAllHandlers() {
//   // 펼침 토글
//   $(".parent-header")
//     .off("click")
//     .on("click", function () {
//       $(this).next(".child-list").slideToggle(200);
//     });

//   // 모델 추가
//   $(".add-child")
//     .off("click")
//     .on("click", function () {
//       const $this = $(this);
//       const parentId = $this.data("parent");

//       const $form = $(`
//         <li class="add-form">
//           <input type="text" placeholder="모델 이름 입력" class="model-input" />
//           <button class="confirm-add">추가</button>
//           <button class="cancel-add">취소</button>
//         </li>
//       `);
//       $this.replaceWith($form);

//       $form.find(".confirm-add").on("click", function () {
//         const modelName = $form.find(".model-input").val().trim();
//         if (!modelName) {
//           alert("모델 이름을 입력하세요.");
//           return;
//         }

//         const $newLi = $(`
//           <li class="child" data-parent="${parentId}">
//             ${modelName}
//             <span class="actions">
//               <button>★</button>
//               <button>✎</button>
//               <button>🗑️</button>
//             </span>
//           </li>
//         `);

//         $form.before($newLi);
//         $form.replaceWith(
//           `<li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>`
//         );
//         $newLi.draggable({
//           helper: "clone",
//           revert: "invalid",
//         });
//         bindAllHandlers();
//       });

//       $form.find(".cancel-add").on("click", function () {
//         $form.replaceWith(
//           `<li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>`
//         );
//         bindAllHandlers();
//       });
//     });

//   // draggable 다시
//   $(".parent > ul > li.child").draggable({
//     helper: "clone",
//     revert: "invalid",
//   });

//   // droppable 다시
//   $(".parent > ul").each(function () {
//     const parentId = $(this).closest(".parent").attr("id");
//     $(this).droppable({
//       accept: `.child[data-parent='${parentId}']`,
//       drop: function (event, ui) {
//         const $droppedItem = ui.draggable;
//         const $ul = $(this);
//         $ul.append($droppedItem);
//         $droppedItem.css({ top: 0, left: 0 });
//         $droppedItem.attr("data-parent", parentId);

//         // add-child 항상 마지막에
//         const $addChild = $ul.find(".add-child");
//         if ($addChild.length) {
//           $ul.append($addChild);
//         }
//       },
//     });
//   });

//   // 제조사 추가 버튼 다시
//   $(".add-parent-button")
//     .off("click")
//     .on("click", function () {
//       setParentEvent();
//     });
// }

// export function setParentEvent() {
//   $(".add-parent-button")
//     .off("click")
//     .on("click", function () {
//       const $wrapper = $(this).parent();

//       // 폼 UI로 변경
//       const $form = $(`
//           <div class="add-parent-form">
//             <input type="text" class="new-parent-name" placeholder="제조사 이름 입력" />
//             <button class="confirm-add-parent">추가</button>
//             <button class="cancel-add-parent">취소</button>
//           </div>
//         `);
//       $(this).replaceWith($form);

//       // [추가] 클릭 시
//       $form.find(".confirm-add-parent").on("click", function () {
//         const name = $form.find(".new-parent-name").val().trim();
//         if (!name) {
//           alert("제조사 이름을 입력하세요.");
//           return;
//         }

//         const newId = `parent-${Date.now()}`; // 고유 ID

//         // 새 제조사 DOM 생성
//         const $newParent = $(`
//             <div style=" display: flex; justify-content: space-between; gap: 2px">
//                <div class="parent" id="${newId}">
//                   <strong class="parent-header">${name}</strong>
//                   <ul class="child-list" ">
//                     <li class="add-child" data-parent="${newId}">➕ 클릭하여 모델 추가</li>
//                   </ul>
//                </div>
//                <div>
//                   <div>
//                     <button>★</button>
//                     <button>✎</button>
//                     <button>🗑️</button>
//                   </div>
//               </div>

//             </div>
//           `);

//         // 리스트에 추가
//         $wrapper.before($newParent);

//         // 다시 버튼 복원
//         $form.replaceWith(
//           `<div class="add-parent-button">➕ 클릭하여 제조사 추가</div>`
//         );

//         // 이벤트 다시 연결
//         bindAllHandlers();
//       });

//       // [취소] 클릭 시
//       $form.find(".cancel-add-parent").on("click", function () {
//         $form.replaceWith(
//           `<div class="add-parent-button">➕ 클릭하여 제조사 추가</div>`
//         );
//         bindAllHandlers();
//       });
//     });
// }
// 모든 이벤트 초기화 함수
import { setupDataParent } from "./events/domUtils";
import { setupDraggable } from "./events/setupDraggable";
import { setupDroppable } from "./events/setupDroppable";
import { bindAddChildHandlers } from "./events/modelHandlers";
import { bindParentHandlers } from "./events/parentHandlers";
import { bindCommonHandlers } from "./events/handlers";

export function initializeEvents() {
  setupDataParent();
  setupDroppable();
  setupDraggable();
  bindAddChildHandlers();
  bindParentHandlers();
  bindCommonHandlers(); // toggle, 버튼 이벤트 등
}

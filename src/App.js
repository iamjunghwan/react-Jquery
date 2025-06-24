import { useEffect } from "react";
import "./App.css";
import parents from "./parentData.json";
import $ from "jquery";
import "jquery-ui/ui/widgets/tabs";
import "jquery-ui/ui/widgets/accordion";

import { initializeEvents } from "./events/domInit";

function App() {
  useEffect(() => {
    $("#tabs").tabs();
    // 처음엔 닫혀있고
    $(".child-list").hide();

    // 이벤트 초기화
    initializeEvents();
  }, []);

  return (
    <div>
      <div id="tabs">
        <ul>
          <li>
            <a href="#1">제조사 및 모델</a>
          </li>
          <li>
            <a href="#2">픽스쳐(지름)</a>
          </li>
          <li>
            <a href="#3">픽스쳐(길이)</a>
          </li>
          <li>
            <a href="#4">보철타입</a>
          </li>
          <li>
            <a href="#5">접착종류</a>
          </li>
        </ul>

        <div id="1">
          <h3>제조사 및 모델</h3>
          <div id="parent-sortable">
            {parents.map((obj, index) => (
              <li
                key={obj.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2px",
                }}
                className="parent ui-state-default"
              >
                <div id={`parent-${obj.id}`}>
                  <div>
                    <strong className="parent-header">{obj.nameKr}</strong>
                    <ul id="sortable" className="child-list">
                      {obj.children?.models?.map((model) => (
                        <li
                          style={{
                            display: "flex",
                            gap: "2px",
                            alignItems: "center",
                          }}
                          className="child"
                          key={model.id}
                        >
                          {model.name}
                          <button className="favorite-btn">
                            {model.isFavorite === "Y" ? "⭐️" : "★"}
                          </button>

                          <button className="edit-btn">✎</button>
                          <button className="delete-btn">🗑️</button>
                        </li>
                      ))}

                      <li
                        className="add-child"
                        data-parent={`parent-${obj.id}`}
                      >
                        모델을 추가하려면 클릭하세요
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button className="favorite-btn">
                    {obj.isFavorite === "Y" ? "⭐️" : "★"}
                  </button>

                  <button className="edit-btn">✎</button>
                  <button className="delete-btn">🗑️</button>
                </div>
              </li>
            ))}
          </div>
          {/* end  parent-sortable*/}
          <div className="add-parent-wrapper">
            <div className="add-parent-button">➕ 클릭하여 제조사 추가</div>
          </div>
        </div>

        <div id="2">
          <h3>픽스쳐(지름)</h3>
          <div>픽스쳐(지름) 데이터 올 area</div>
        </div>

        <div id="3">
          <h3>픽스쳐(길이)</h3>
          <div>픽스쳐(길이) 데이터 올 area</div>
        </div>

        <div id="4">
          <h3>보철타입</h3>
          <div>보철타입 데이터 올 area</div>
        </div>

        <div id="5">
          <h3>접착종류</h3>
          <div>접착종류 데이터 올 area</div>
        </div>
      </div>
    </div> //end tabs
  );
}

export default App;

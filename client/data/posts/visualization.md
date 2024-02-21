[React Flow](https://reactflow.dev/docs/api/react-flow-props/)는 API나 Examples가 잘 설명되어 있어서 필요한 props를 가져다 사용할 수 있다.

```typescript
import ReactFlow, {
  Node,
  Edge,
  isEdge,
  isNode,
  ConnectionLineType,
  Panel,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  nodesDraggable={false}
  fitView
  minZoom={-Infinity}
  maxZoom={Infinity}
  connectionLineType={ConnectionLineType.SmoothStep}
  elementsSelectable={true}
  onSelectionChange={(selectedElements) => {
    const node = selectedElements.nodes[0];
    setSelectde(node);
    typeof selectde !== "undefined" && highlightPath(node, nodes, edges, true);
  }}
  onPaneClick={() => {
    resetNodeStyles();
    setSelectedNode({});
  }}
>
  <Panel position="top-right">
    <Controls />
  </Panel>
</ReactFlow>;
```

`nodeTypes`는 `custom`타입으로 원하는 UI로 template를 만들 수 있다.

```typescript
const nodeTypes = {
  custom: CustomLayout,
};
```

```typescript
const CustomNode: React.FC<IProps> = ({ data }) => {
  const { setSelectedNode } = useVisualizations();

  const handleSelectedNode = () => {
    setSelectedNode(data);
  };

  return (
    <S.CustomNodeWrap>
      <S.NodeViewWrap>
        <img
          src={`images/visualizationIcons/${data.label}.png`}
          alt=""
          onClick={handleSelectedNode}
        />
        <S.NodeTextBox>
          <S.NodeName>{data.name}</S.NodeName>
          <S.NodeSubName>{data.label}</S.NodeSubName>
        </S.NodeTextBox>
      </S.NodeViewWrap>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </S.CustomNodeWrap>
  );
};

export const CustomLayout = memo(CustomNode);
```

node를 클릭하면 하이라이팅 되는 기능은 git에 공유된 코드를 참고했다.

> [Highlight path of selected node?](https://github.com/wbkd/react-flow/issues/984)

제일 어려웠던 부분은 `Auto layout` 부분이였는데 수시간의 삽질을 통해 많은 참고 자료를
얻을 수 있었었다.  
확실히 [d3.js](https://d3js.org/)로 구현한다면 더 다양한 효과와 기능을 추가 할 수 있을 것이다.

참고:  
https://codesandbox.io/s/wf17n1?file=/App.js:251-286&utm_medium=sandpack  
https://codesandbox.io/s/react-flow-elk-auto-layout-8sqdtu?file=/src/elements.js

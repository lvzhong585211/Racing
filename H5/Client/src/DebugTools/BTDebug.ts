namespace FBT {
    /**
     * 声明下面的js代码所用到的D3.js的函数.以便去掉TS的编译检测
     */
    // tslint:disable-next-line:class-name
    declare class d3 {
        static tree(): any;
        static hierarchy(data: any, children?: Function): any;
        static select(name: string): any;
        static selectAll(name: string): any;
        static interpolate(a, b): any;
        static rgb(r, g, b): any;
    }

    /**
     * 行为树的调试器
     */
    export class Debugger {
        public static Init(): void {
            // 加载D3.js
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://d3js.org/d3.v5.min.js";
            // script.src = "libs/d3.js";            
            script.onload = function () {
                // 设置 CSS样式
                const style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = `.node circle {
                                stroke: steelblue;
                                stroke-width: 3px;
                            }
                            
                            .node text {
                                fill:white;
                            }

                            .node--internal text {
                                text-shadow:2px 2px 4px #000;
                            }

                            .node--leaf text {
                                color: #fff;
                                text-shadow:2px 2px 4px #000;
                            }

                            .link {
                                fill: none;
                                stroke: #ccc;
                                stroke-width: 2px;
                            }
                            `;
                document.getElementsByTagName("HEAD").item(0).appendChild(style);

                Debugger.linearColor = d3.interpolate(d3.rgb(255, 255, 255), d3.rgb(255, 0, 0));
            };
            document.body.appendChild(script);
        }

        private static mCurrentDebugNode: RootNode = null;      // 保存当前正在调试的行为树根节点
        private static mG: any = null;                          // svg
        private static mNodes: any = null;                      // 用于渲染的nodes
        private static linearColor: any;                         // 颜色插值函数        
        private static mNodeRunList: BehaviorTreeNodeInterface[];    // 保存行为树节点的执行历史记录
        /**
         * 每帧更新行为树的渲染
         */
        private static updateRender(): void {
            const rootNode = Debugger.mCurrentDebugNode;

            // 刷新数据
            {
                d3.selectAll("circle").attr("fill", function (d) {
                    const nodeRunList = Debugger.mNodeRunList;
                    const index = nodeRunList.indexOf(d.data);
                    if (index >= 0) {
                        return Debugger.linearColor(index / 5);
                    }
                    return "#fff";
                });

                d3.selectAll("text").text(function (d) {
                    let rawName = d.data.name;
                    if (d.data instanceof SelectorNode) {
                        rawName += " (Selector)";
                    }
                    else if (d.data instanceof SequenceNode) {
                        rawName += " (Sequence)";
                    }
                    else if (d.data instanceof ParallelNode) {
                        rawName += " (Parallel)";
                    }
                    const nodeRunList = Debugger.mNodeRunList;
                    const index = nodeRunList.indexOf(d.data);
                    return index >= 0 ? `(${index}) ${rawName}` : rawName;
                });
            }
        }

        /**
         * 调试给定的行为树
         * @param rootNode 指定要调试的行为树的根节点
         */
        public static Debug(rootNode: RootNode): void {
            if (Debugger.mCurrentDebugNode) {
                d3.select("svg").remove();    // 移除掉行为树节点的渲染
            }
            Debugger.mCurrentDebugNode = null;
            Laya.timer.clear(Debugger, Debugger.updateRender); // 渲染指定的行为树

            if (!rootNode) {
                return;
            }

            // 重载RootNode的curNode,以便我们记录Node的切换历史
            Object.defineProperty(rootNode, "curNode", {
                get: function () {
                    return this._curNode;
                },
                set: function (value) {
                    const _rootNode = this;
                    _rootNode._curNode = value;

                    // 添加节点到历史记录列表中                    
                    if (value) {
                        const nodeRunList = Debugger.mNodeRunList;
                        nodeRunList.push(value);
                        if (nodeRunList.length > 5) {
                            nodeRunList.shift();
                        }
                    }
                },
            });

            Debugger.mCurrentDebugNode = rootNode;
            Debugger.mNodeRunList = [];

            // set the dimensions and margins of the diagram
            const margin = {
                top: 40,
                right: 90,
                bottom: 100,
                left: 90,
            },
                width = 1500 - margin.left - margin.right,
                height = 800 - margin.top - margin.bottom;

            // declares a tree layout and assigns the size
            const treemap = d3.tree()
                .size([width, height]);

            //  assigns the data to a hierarchy using parent-child relationships
            Debugger.mNodes = d3.hierarchy(rootNode, (data: any) => {
                // 注:如果节点有子节点的话,变量名称一定要叫做children,它可以是一个数组或对象
                if (data.children) {
                    return Array.isArray(data.children) ? data.children : [data.children];
                }
                return null;
            });

            // maps the node data to the tree layout
            Debugger.mNodes = treemap(Debugger.mNodes);

            // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            const svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("style", "position: absolute;z-index:1000;pointer-events: visiblePainted");
            Debugger.mG = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            const g = Debugger.mG;
            const nodes = Debugger.mNodes;

            const linkDatas = g.selectAll(".link")
                .data(nodes.descendants().slice(1));

            // adds the links between the nodes
            const link = linkDatas.enter().append("path")
                .attr("class", "link")
                .attr("d", function (d) {
                    return "M" + d.x + "," + d.y +
                        "C" + d.x + "," + (d.y + d.parent.y) / 2 +
                        " " + d.parent.x + "," + (d.y + d.parent.y) / 2 +
                        " " + d.parent.x + "," + d.parent.y;
                });

            const nodeDatas = g.selectAll(".node")
                .data(nodes.descendants());

            // adds each node as a group
            {
                const node = nodeDatas.enter().append("g")
                    .attr("class", function (d) {
                        return "node" +
                            (d.children ? " node--internal" : " node--leaf");
                    })
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });

                // adds the circle to the node
                node.append("circle")
                    .attr("r", 10)
                    .attr("fill", function (d) {
                        return d.data === Debugger.mCurrentDebugNode.curNode ? "#f00" : "#fff";    // 当前正在运行的节点显示成红色
                    });

                // adds the text to the node
                node.append("text")
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(35)")
                    .attr("y", function (d) {
                        return d.children ? -20 : 20;
                    })
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d.data.name;
                    });
            }

            Laya.timer.frameLoop(1, Debugger, Debugger.updateRender);   // 每帧渲染            
        }
    }
}
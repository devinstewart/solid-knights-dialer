import { createSignal, createEffect, For, Show } from 'solid-js';
import reachableKeys from './utils/reachableKeys';
import countPaths from './utils/countPaths';
import listAcyclicPaths from './utils/listAcrylicPaths';

const App = () => {
    const [hops, setHops] = createSignal(3);
    const [reachableNumbers, setReachableNumbers] = createSignal([]);
    const [currentNumber, setCurrentNumber] = createSignal(null);
    const [hopCount, setHopCount] = createSignal(null);
    const [acyclicPaths, setAcyclicPaths] = createSignal([]);

    createEffect(() => {
        if (currentNumber() !== null) {
            setHopCount(countPaths(currentNumber(), hops()));
        }
    });

    return (
        <>
            <div class='input'>
                <span>Hops to take: </span>
                <input
                    type='number'
                    min='1'
                    value='3'
                    class='numInput'
                    onChange={(e) => {
                        const hops = Number(e.target.value);
                        setHops(hops);
                    }}
                />
            </div>
            <div id='dialpad'>
                <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}>
                    {(number) => (
                        <>
                            <button
                                type='button'
                                classList={{ highlighted: reachableNumbers().includes(number) }}
                                onMouseOver={() => setReachableNumbers(reachableKeys(number))}
                                onMouseLeave={() => setReachableNumbers([])}
                                onClick={() => {
                                    setCurrentNumber(number);
                                    setHopCount(countPaths(number, hops()));
                                    setAcyclicPaths(listAcyclicPaths(number));
                                }}
                            >
                                {number}
                            </button>
                            <Show when={number === 9}>
                                <span></span>
                            </Show>
                        </>
                    )}
                </For>
            </div>
            <Show when={currentNumber() !== null}>
                <>
                    <p>
                        Count of distinct paths starting from <span id='starting-key-1'>{currentNumber()}</span> and
                        taking <span id='hop-count'>{hops()}</span> hop(s): <span id='path-count'>{hopCount()}</span>
                    </p>

                    <hr />
                    <h3>
                        Distinct acyclic paths starting from <span>{currentNumber()}</span>:
                    </h3>
                    <div id='acyclic-paths'>
                        <For each={acyclicPaths()}>
                            {(pathNums) => (
                                <div>
                                    <For each={pathNums}>
                                        {(num, i) => (
                                            <>
                                                {num}
                                                <Show when={i() < pathNums.length - 1}>
                                                    <span> &#x27A1; </span>
                                                </Show>
                                            </>
                                        )}
                                    </For>
                                </div>
                            )}
                        </For>
                        <Show when={acyclicPaths().length === 0}>
                            <span>None</span>
                        </Show>
                    </div>
                </>
            </Show>
        </>
    );
};

export default App;

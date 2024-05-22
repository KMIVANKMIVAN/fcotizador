import useStore from '../estados/authStore';

export function Counter() {
  const { count, increaseCount, decreaseCount } = useStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  );
}

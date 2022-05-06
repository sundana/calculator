import { useReducer } from 'react';
import './App.css';

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR_DIGIT: 'clear-digit',
  ADD_OPERATION: 'add-operation',
  EQUALS: 'equals',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.initial === 0 && payload === '0') {
        return state;
      } else if (
        (state.initial === 0 || state.initial === '0') &&
        payload === '.'
      ) {
        return {
          ...state,
          initial: `${state.initial || '0'}${payload}`,
        };
      } else if (typeof state.initial === 'string') {
        if (state.initial.includes('.') && payload === '.') {
          return state;
        }
      } else if (state.overwrite) {
        return { ...state, initial: `${payload}`, overwrite: false };
      }

      return {
        ...state,
        initial: `${state.initial || ''}${payload}`,
      };
    case ACTIONS.CLEAR_DIGIT:
      return {
        initial: 0,
      };
    case ACTIONS.ADD_OPERATION:
      if (state.prev !== undefined) {
        if (payload !== '-' && state.operator && !state.initial) {
          const prevArr = state.prev.split('');
          const firstOpIndex = prevArr.indexOf(state.operator);
          const lastOpIndex = prevArr.lastIndexOf(state.operator);
          if (state.operator === '-') {
            prevArr.splice(
              firstOpIndex - 1,
              prevArr.length - lastOpIndex + 1,
              payload
            );
          } else {
            prevArr.splice(lastOpIndex, 1, payload);
          }
          return {
            ...state,
            prev: `${prevArr.join('')}`,
            operator: payload,
            initial: '',
          };
        }
        return {
          ...state,
          prev: `${state.prev}${state.initial}${payload}`,
          operator: payload,
          initial: '',
        };
      }
      return {
        ...state,
        prev: `${state.initial}${payload}`,
        operator: payload,
        initial: '',
      };
    case ACTIONS.EQUALS:
      return { initial: eval(state.initial), overwrite: true };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { initial: 0 });
  console.log(state.initial);
  return (
    <div className="kalkulator">
      <div className="prev">{state.prev}</div>
      <div id="display">{state.initial}</div>
      <Button dispatch={dispatch} />
    </div>
  );
}

function Button({ dispatch }) {
  return (
    <div className="button-wrapper">
      <button
        id="clear"
        className="span2"
        onClick={() => dispatch({ type: ACTIONS.CLEAR_DIGIT })}
      >
        AC
      </button>
      <button
        id="divide"
        onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: '/' })}
      >
        /
      </button>
      <button
        id="multiply"
        onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: '*' })}
      >
        *
      </button>
      <button
        id="seven"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '7' })}
      >
        7
      </button>
      <button
        id="eight"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '8' })}
      >
        8
      </button>
      <button
        id="nine"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '9' })}
      >
        9
      </button>
      <button
        id="add"
        onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: '+' })}
      >
        +
      </button>
      <button
        id="four"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '4' })}
      >
        4
      </button>
      <button
        id="five"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '5' })}
      >
        5
      </button>
      <button
        id="six"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '6' })}
      >
        6
      </button>
      <button
        id="subtract"
        onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: '-' })}
      >
        -
      </button>
      <button
        id="one"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '1' })}
      >
        1
      </button>
      <button
        id="two"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '2' })}
      >
        2
      </button>
      <button
        id="three"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '3' })}
      >
        3
      </button>
      <button
        id="equals"
        className="row2"
        onClick={() => dispatch({ type: ACTIONS.EQUALS })}
      >
        =
      </button>
      <button
        id="zero"
        className="span2"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '0' })}
      >
        0
      </button>
      <button
        id="decimal"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: '.' })}
      >
        .
      </button>
    </div>
  );
}

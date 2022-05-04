import React from 'react';
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
      break;
    case ACTIONS.CLEAR_DIGIT:
      return {
        initial: 0,
      };
      break;
    case ACTIONS.ADD_OPERATION:
      if (payload === '/')
        return { ...state, initial: `${state.initial} ${payload} ` };
      else if (payload === '*')
        return { ...state, initial: `${state.initial} ${payload} ` };
      else if (payload === '+')
        return { ...state, initial: `${state.initial} ${payload} ` };
      else if (payload === '-')
        return { ...state, initial: `${state.initial} ${payload} ` };
      break;
    case ACTIONS.EQUALS:
      return { initial: eval(state.initial), overwrite: true };
      break;
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, { initial: 0 });
  console.log(state.initial);
  return (
    <div className="kalkulator">
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

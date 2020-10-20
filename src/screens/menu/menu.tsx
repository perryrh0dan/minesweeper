import React, { useEffect } from "react";

import "./menu.scss";

import { useHistory } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import useQueryState from "../../hooks/useQueryState";

function sizeValidation(fieldValue: any) {
  let value = parseInt(fieldValue);

  if (isNaN(value)) {
    return `Value has to be a number`
  }

  if (value < 5 || value > 30) {
    return `Value must be between 5 and 30`;
  }
  return null;
};

function bombsValidation(fieldValue: any) {
  let value = parseInt(fieldValue);

  if (isNaN(value)) {
    return `Value has to be a number`
  }

  if (value < 10 || value > 100) {
    return `Value must be between 10 and 100`;
  }
  return null;
};

export default function Menu() {
  const history = useHistory();

  const [size, setSize] = useQueryState<string|null>('size');
  const [bombs, setBombs] = useQueryState<string|null>('bombs');

  const { value: sizeInput, error: sizeInputError, validate: validateSizeInput, bind: bindSize } = useInput(size || "10", sizeValidation);
  const { value: bombsInput, error: bombsInputError, validate: validateBombsInput, bind: bindBombs } = useInput(bombs || "10", bombsValidation);

  useEffect(() => {
    setSize(sizeInput)
  }, [sizeInput, setSize]);

  useEffect(() => {
    setBombs(bombsInput)
  }, [bombsInput, setBombs]);

  async function startHandler() {
    const valid = !(
      await Promise.all([
        validateSizeInput(),
        validateBombsInput(),
      ])
    ).includes(false);

    if (!valid) {
      return;
    }

    history.push(`/game?size=${size}&bombs=${bombs}`);
  }

  return (
    <div className="menu">
      <label>Size</label>
      <span className="error">{sizeInputError}</span>
      <input placeholder="size" type="number" {...bindSize}></input>
      <label>Bombs</label>
      <span className="error">{bombsInputError}</span>
      <input placeholder="bombs" type="number" {...bindBombs}></input>
      <button onClick={startHandler}>Start</button>
    </div>
  );
}

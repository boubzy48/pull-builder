import { useState } from "react";
import "./App.css";

// MODELS
const modelInput = {
  sampleWidth: 0,
  stitchNumber: 0,
  humanWidth: 0,
  humanHeight: 0,
};

const modelOutput = {
  pullWidth: 0,
  pullHeight: {
    firstStep: 0,
    secondStep: 0,
  },
};

// CALCULATION FUNCTIONS
function calculatePullWidth(sampleWidth, stitchNumber, humanWidth) {
  if (sampleWidth > 0 && stitchNumber > 0 && humanWidth > 0) {
    const stichesForTenCm = Math.round((stitchNumber * 10) / sampleWidth);
    const pullWidth = (humanWidth * stichesForTenCm) / 10;

    return Math.round(pullWidth);
  }

  return 0;
}

function calculatePullHeight(humanHeight) {
  if (humanHeight > 0) {
    const firstStep = Math.round(humanHeight / 1.6);
    const secondStep = Math.round(humanHeight / 3);

    return { firstStep, secondStep };
  }

  return { firstStep: 0, secondStep: 0 };
}

// COMPONENTS
function Input({ label, id, value, onChange }) {
  return (
    <div className="input">
      <label htmlFor="width">{label}</label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function WidthInputs({ state, onStateChange }) {
  return (
    <>
      <Input
        label="Your sample width (cm):"
        id="sampleWidth"
        value={state.sampleWidth}
        onChange={(e) =>
          onStateChange("sampleWidth", parseFloat(e.target.value))
        }
      />
      <Input
        label="Number of stitches:"
        id="sampleStitches"
        value={state.stitchNumber}
        onChange={(e) =>
          onStateChange("stitchNumber", parseFloat(e.target.value))
        }
      />
      <Input
        label="Your width (cm):"
        id="humanWidth"
        value={state.humanWidth}
        onChange={(e) =>
          onStateChange("humanWidth", parseFloat(e.target.value))
        }
      />
    </>
  );
}

function HeightInputs({ state, onStateChange }) {
  return (
    <>
      <Input
        label="Your height (cm):"
        id="humanHeight"
        value={state.humanHeight}
        onChange={(e) =>
          onStateChange("humanHeight", parseFloat(e.target.value))
        }
      />
    </>
  );
}

function Form({ inputState, onStateChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <section>
        <h1>Pull Builder</h1>
        <form>
          <WidthInputs state={inputState} onStateChange={onStateChange} />
          <HeightInputs state={inputState} onStateChange={onStateChange} />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

function Result({ outputState }) {
  const { pullWidth, pullHeight } = outputState;

  return (
    <>
      <section>
        <div>
          <h2>Pull Width</h2>
          <p>Number of stitches: {pullWidth}</p>
        </div>
        <div>
          <h2>Pull Height</h2>
          <p>First step: {pullHeight.firstStep} cm</p>
          <p>Second step: {pullHeight.secondStep} cm</p>
        </div>
      </section>
    </>
  );
}

function PullBuilder() {
  const [inputState, setInputState] = useState(modelInput);
  const [outputState, setOutputState] = useState(modelOutput);

  const handleStateChange = (key, value) => {
    setInputState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const { sampleWidth, stitchNumber, humanWidth, humanHeight } = inputState;
    const pullWidth = calculatePullWidth(sampleWidth, stitchNumber, humanWidth);
    const pullHeight = calculatePullHeight(humanHeight);
    setOutputState({
      pullWidth,
      pullHeight,
    });
  };

  return (
    <>
      <Form
        inputState={inputState}
        onStateChange={handleStateChange}
        onSubmit={handleSubmit}
      />
      <Result outputState={outputState} />
    </>
  );
}

function App() {
  return (
    <div>
      <PullBuilder />
    </div>
  );
}

export default App;

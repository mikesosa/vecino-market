import { DotPulse } from "@uiball/loaders";

export default function Spinner() {
  return (
    <div className="py-2">
      <DotPulse color="#fff" size={50} lineWeight={9.5} />
    </div>
  );
}

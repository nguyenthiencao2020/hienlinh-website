import { createFacility } from "../actions";
import { FacilityForm } from "../facility-form";

export default function NewFacilityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Cơ sở mới</h1>
      <div className="mt-6">
        <FacilityForm action={createFacility} />
      </div>
    </div>
  );
}

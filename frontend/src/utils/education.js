export const makeUniv = () => ({
  id: null, school: "", degree: "BACHELOR", city: "", district: "",
  periodStart: "", periodEnd: "", admission: "", gradStatus: "",
  majorGroup: "", major: "", gpa: null, maxGpa: "",
});

export const makeGrad = () => ({
  id: null, school: "", degree: "MASTER", city: "", district: "",
  periodStart: "", periodEnd: "", admission: "", gradStatus: "",
  majorGroup: "", major: "", gpa: null, maxGpa: "",
});

export const makeCareer = () => ({
  id: null, company: "", department: "", rank: "", role: "",
  periodStart: "", periodEnd: "", employmentType: "",
});

export function enforceMax(item) {
  const max = item.maxGpa;
  let v = Number(item.gpa);
  if (Number.isNaN(v)) { item.gpa = null; return; }
  if (v > max) v = max;
  if (v < 0) v = 0;
  item.gpa = Math.round(v * 100) / 100;
}

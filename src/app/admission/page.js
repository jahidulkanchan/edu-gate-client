import AdmissionForm from "./AdmissionForm";


export const metadata = {
  title: 'Admission',
};

export default function AdmissionPage() {
  // এখানে আমরা কোনো ডাটা সার্ভার থেকে সরাসরি ফেচ করবো না
  // কারণ client কম্পোনেন্ট Axios দিয়ে API থেকে ফেচ করছে

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admission Page</h1>
      <AdmissionForm />
    </main>
  );
}

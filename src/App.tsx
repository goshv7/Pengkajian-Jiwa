import React, { useState } from 'react';
import { cn } from './lib/utils';
import { Activity, BrainCircuit, HeartPulse, Stethoscope, Save, FileText, FileSearch, CheckCircle } from 'lucide-react';

const NUTRISI_1_OPTIONS = [
  { label: "Tidak (tidak terjadi penurunan dalam 6 bulan terakhir)", value: "0", score: 0 },
  { label: "Tidak yakin (tanyakan apakah baju/celana terasa longgar)", value: "2_yakin", score: 2 },
  { label: "Ya, 1 - 5 kg", value: "1", score: 1 },
  { label: "Ya, 6 - 10 kg", value: "2", score: 2 },
  { label: "Ya, 11 - 15 kg", value: "3", score: 3 },
  { label: "Ya, > 15 kg", value: "4", score: 4 },
  { label: "Ya, Tidak yakin", value: "2_ya_yakin", score: 2 },
];
const NUTRISI_2_OPTIONS = [
  { label: "Tidak", value: "0", score: 0 },
  { label: "Ya", value: "1", score: 1 }
];
const NUTRISI_3_OPTIONS = [
  { label: "Tidak", value: "0", score: 0 },
  { label: "Ya", value: "2", score: 2 }
];

const STATUS_FUNGSIONAL_OPTIONS = [
  { label: "Mandiri", value: "1", score: 1 },
  { label: "Ketergantungan", value: "0", score: 0 }
];

const STATUS_FUNGSIONAL_FIELDS = [
  { key: "mandi", label: "Mandi" },
  { key: "memakaiBaju", label: "Memakai Baju" },
  { key: "toileting", label: "Toileting" },
  { key: "berpindahTempat", label: "Berpindah Tempat" },
  { key: "kontinensia", label: "Kontinensia" },
  { key: "makan", label: "Makan" }
];

const STATUS_MENTAL_OPTIONS = {
  penampilan: ["Rapih", "Anggota Badan Kotor/Tidak rapi", "Menggunakan pakaian tidak sesuai", "Cara berpakaian tidak seperti biasa"],
  pembicaraan: ["Cepat", "Keras", "Gagap", "Apatis", "Inkoheren", "Koheren", "Membisu", "Lambat", "Tidak mampu menilai pembicaraan"],
  aktivitasMotorik: ["Lesu", "Gelisah", "Tik", "Tremor", "Gremasen", "Tegang", "Kompulsif", "Agitasi"],
  alamPerasaan: ["Sedih", "Ketakutan", "Putus asa", "Khawatir", "Gembira", "Berlebihan"],
  interaksiWawancara: ["Bermusuhan", "Tidak kooperatif", "Mudah tersinggung", "Kontak mata kurang", "Defensif", "Curiga"],
  persepsi: ["Pendengaran", "Penglihatan", "Perabaan", "Pengecapan", "Penghidu", "Tidak ada"],
  prosesPikir: ["Sirkumtansial", "Tangensial", "Kehilangan Asosiasi", "Koheren", "Flight of idea", "Blocking", "Pengulangan", "Pembicaraan perseverasi"],
  isiPikiran: ["Obsesi", "Fobia", "Hipokhondria", "Depersonalisasi", "Ide yang terkait", "Pikiran Magis", "Tidak ada"],
  waham: ["Agama", "Somatik", "Kebesaran", "Curiga", "Nihilistik", "Sisip pikir", "Siar pikir", "Kontrol pikiran", "Tidak ada"],
  tingkatKesadaran: ["Bingung", "Sedasi", "Stupor", "Tenang", "Disorientasi Waktu", "Disorientasi Tempat", "Disorientasi Orang", "Tidak ada"],
  memori: ["Gangguan daya ingat jangka panjang", "Gangguan daya ingat jangka pendek", "Gangguan daya ingat saat ini", "Tidak ada gangguan", "Konfabulasi"],
  tingkatKonsentrasi: ["Mudah beralih", "Tidak mudah berhitung sederhana", "Tidak mampu berkonsentrasi", "Mampu berkonsentrasi"],
};

const DROPDOWNS_STATUS_MENTAL = {
  afek: ["Datar", "Tumpul", "Labil", "Sesuai", "Tidak sesuai"],
  kemampuanEvaluasi: ["Gangguan ringan", "Gangguan bermakna", "Tidak ada gangguan bermakna"],
  dayaTilikDiri: ["Mengingkari penyakit yang diderita", "Menyalahkan hal-hal diluar dirinya"],
};

const KOPING_OPTIONS = ["Adaftif", "Maladaftif", "Olah raga", "Menghindar", "Teknik Relaksasi", "Mencederai diri", "Bekerja berlebihan", "Minuman alkohol", "Mampu menyelesaikan masalah", "Bicara dengan orang lain", "Reaksi lambat berlebihan"];
const PULANG_OPTIONS = ["Makan", "Eliminasi (BAB / BAK)", "Kebersihan diri", "Berhias / berdandan", "Istirahat tidur", "Penggunaan obat", "Perawatan lanjutan / pendukung", "Kegiatan didalam rumah", "Kegiatan diluar rumah"];
const DIAGNOSIS_OPTIONS = ["Defisit perawatan diri", "Gangguan persepsi sensori halusinasi", "Gangguan isi pikir", "Isolasi Sosial", "Perilaku kekerasan/ Resiko perilaku kekerasan", "Gangguan konsep diri", "Risiko bunuh diri"];


const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("block text-[10px] font-bold text-slate-500 uppercase mb-1", className)}>
    {children}
  </label>
);

const Select = ({ value, onChange, options, placeholder = "Pilih opsi...", className }: any) => (
  <select
    value={value}
    onChange={onChange}
    className={cn(
      "w-full mt-1 p-2 text-sm border border-slate-300 rounded bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50",
      className
    )}
  >
    <option value="" disabled>{placeholder}</option>
    {options.map((opt: any) => (
      <option key={opt.value || opt} value={opt.value || opt}>
        {opt.label || opt}
      </option>
    ))}
  </select>
);

const CheckboxGroup = ({ options, selectedValues, onChange }: any) => {
  const handleToggle = (opt: string) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter((v: string) => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 mt-1">
      {options.map((opt: string) => (
        <label key={opt} className="flex items-start gap-2 p-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100 hover:border-slate-200 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={selectedValues.includes(opt)}
            onChange={() => handleToggle(opt)}
            className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
          />
          <span className="text-xs text-slate-700 font-medium leading-tight">{opt}</span>
        </label>
      ))}
    </div>
  );
};

const ReportSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold text-blue-800 uppercase mb-3 border-b-2 border-blue-100 pb-1 inline-block">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {children}
    </div>
  </div>
);

const ReportItem = ({ label, value, fullWidth = false }: { label: string, value: string | string[], fullWidth?: boolean }) => {
  const displayValue = Array.isArray(value) ? (value.length > 0 ? value.join(", ") : "-") : (value || "-");
  return (
    <div className={cn("space-y-1", fullWidth && "md:col-span-2")}>
      <div className="text-[10px] font-bold text-slate-500 uppercase">{label}</div>
      <div className="text-sm text-slate-900 font-medium bg-slate-50 p-2 border border-slate-100 rounded leading-snug">{displayValue}</div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('nutrisi');
  const [isSaved, setIsSaved] = useState(false);
  
  // State
  const [formConfig, setFormConfig] = useState<any>({
    // Skrining Nutrisi
    nutrisi1: "",
    nutrisi2: "",
    nutrisi3: "",
    // Status Fungsional
    mandi: "",
    memakaiBaju: "",
    toileting: "",
    berpindahTempat: "",
    kontinensia: "",
    makan: "",
    
    // Status Mental (Dropdowns)
    afek: "",
    kemampuanEvaluasi: "",
    dayaTilikDiri: "",
    // Status Mental (Checkboxes)
    penampilan: [],
    pembicaraan: [],
    aktivitasMotorik: [],
    alamPerasaan: [],
    interaksiWawancara: [],
    persepsi: [],
    prosesPikir: [],
    isiPikiran: [],
    waham: [],
    tingkatKesadaran: [],
    memori: [],
    tingkatKonsentrasi: [],
    
    // Data Diagnostik
    lab: "",
    rad: "",
    lainlain: "",
    
    // Edukasi
    edukasi1: "",
    edukasi2: "",
    edukasi3: "",
    
    // Mekanisme, Rencana, Diagnosis
    mekanismeKoping: [],
    perencanaanPulang: [],
    diagnosisKeperawatan: [],
  });

  const updateForm = (key: string, value: any) => {
    setFormConfig((prev: any) => ({ ...prev, [key]: value }));
  };

  const calculateNutrisiScore = () => {
    let score = 0;
    if (formConfig.nutrisi1) score += NUTRISI_1_OPTIONS.find(o => o.value === formConfig.nutrisi1)?.score || 0;
    if (formConfig.nutrisi2) score += NUTRISI_2_OPTIONS.find(o => o.value === formConfig.nutrisi2)?.score || 0;
    if (formConfig.nutrisi3) score += NUTRISI_3_OPTIONS.find(o => o.value === formConfig.nutrisi3)?.score || 0;
    return score;
  };

  const calculateFungsionalScore = () => {
    let score = 0;
    STATUS_FUNGSIONAL_FIELDS.forEach(field => {
      if (formConfig[field.key]) {
        score += STATUS_FUNGSIONAL_OPTIONS.find(o => o.value === formConfig[field.key])?.score || 0;
      }
    });
    return score;
  };

  const nutrisiScore = calculateNutrisiScore();
  const funcScore = calculateFungsionalScore();

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    console.log("Form Data: ", formConfig);
  };

  const tabs = [
    { id: 'nutrisi', label: 'Nutrisi & Fungsional', icon: <Activity className="w-4 h-4 mr-2" /> },
    { id: 'mental', label: 'Status Mental', icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
    { id: 'diag', label: 'Diagnostik & Edukasi', icon: <FileSearch className="w-4 h-4 mr-2" /> },
    { id: 'koping', label: 'Koping & Diagnosis', icon: <HeartPulse className="w-4 h-4 mr-2" /> },
    { id: 'report', label: 'Ringkasan', icon: <FileText className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B] overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 bg-[#0F172A] text-white shrink-0 shadow z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg shadow-sm">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-wider">Rekam Medis Elektronik - Pengkajian Jiwa</h1>
            <div className="flex gap-4 text-xs opacity-80 mt-0.5">
              <span><strong>Status:</strong> Pengkajian EMR</span>
            </div>
          </div>
        </div>
      </header>
          
      <nav className="flex bg-white border-b border-slate-200 px-4 shrink-0 overflow-x-auto shadow-sm z-10 w-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2",
              activeTab === tab.id 
                ? "border-b-2 border-blue-600 text-blue-600" 
                : "font-medium text-slate-500 hover:bg-slate-50"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
      
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto w-full max-w-6xl mx-auto">
        
        {/* TAB: NUTRISI & FUNGSIONAL */}
        {activeTab === 'nutrisi' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">Skrining Nutrisi</h2>
                <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                  Total Skor: {nutrisiScore}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>1. Apakah pasien mengalami penurunan berat badan yang tidak direncanakan?</Label>
                  <Select
                    value={formConfig.nutrisi1}
                    onChange={(e: any) => updateForm('nutrisi1', e.target.value)}
                    options={NUTRISI_1_OPTIONS}
                  />
                </div>
                <div>
                  <Label>2. Apakah asupan makanan pasien buruk akibat nafsu makan yang menurun?</Label>
                  <Select
                    value={formConfig.nutrisi2}
                    onChange={(e: any) => updateForm('nutrisi2', e.target.value)}
                    options={NUTRISI_2_OPTIONS}
                  />
                </div>
                <div>
                  <Label>3. Sakit Berat</Label>
                  <Select
                    value={formConfig.nutrisi3}
                    onChange={(e: any) => updateForm('nutrisi3', e.target.value)}
                    options={NUTRISI_3_OPTIONS}
                  />
                </div>
                
                {nutrisiScore >= 2 && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start space-x-3">
                    <Activity className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-orange-800">Perhatian: Risiko Malnutrisi</h4>
                      <p className="text-sm text-orange-700 mt-1">Total skor &ge; 2. Rujuk ke dietisien untuk asesmen gizi.</p>
                    </div>
                  </div>
                )}
                {nutrisiScore < 2 && nutrisiScore > 0 && formConfig.nutrisi1 !== "" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-800">Skrining Lanjut</h4>
                      <p className="text-sm text-green-700 mt-1">Total skor &lt; 2. Lakukan skrining ulang dalam 7 hari.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mt-4">
              <div className="flex items-center justify-between mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">Status Fungsional (ADL)</h2>
                <div className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                  Total Skor: {funcScore}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STATUS_FUNGSIONAL_FIELDS.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label className="text-sm">{field.label}</Label>
                      <Select
                        value={formConfig[field.key]}
                        onChange={(e: any) => updateForm(field.key, e.target.value)}
                        options={STATUS_FUNGSIONAL_OPTIONS}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-bold uppercase text-slate-500 flex flex-wrap gap-x-6 gap-y-2">
                  <span>Skor 6 = Pasien Mandiri</span>
                  <span>Skor 4 = Ketergantungan Sedang</span>
                  <span>Skor 0 = Sangat Tergantung</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: STATUS MENTAL */}
        {activeTab === 'mental' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-5">
              
              <div className="space-y-1">
                <Label>1. Penampilan</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.penampilan}
                  selectedValues={formConfig.penampilan}
                  onChange={(val: any) => updateForm('penampilan', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>2. Pembicaraan</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.pembicaraan}
                  selectedValues={formConfig.pembicaraan}
                  onChange={(val: any) => updateForm('pembicaraan', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>3. Aktivitas Motorik</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.aktivitasMotorik}
                  selectedValues={formConfig.aktivitasMotorik}
                  onChange={(val: any) => updateForm('aktivitasMotorik', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>4. Alam Perasaan</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.alamPerasaan}
                  selectedValues={formConfig.alamPerasaan}
                  onChange={(val: any) => updateForm('alamPerasaan', val)}
                />
              </div>

              <div className="space-y-1 max-w-sm">
                <Label>5. Afek</Label>
                <Select
                  value={formConfig.afek}
                  onChange={(e: any) => updateForm('afek', e.target.value)}
                  options={DROPDOWNS_STATUS_MENTAL.afek}
                />
              </div>

              <div className="space-y-1">
                <Label>6. Interaksi Selama Wawancara</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.interaksiWawancara}
                  selectedValues={formConfig.interaksiWawancara}
                  onChange={(val: any) => updateForm('interaksiWawancara', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>7. Persepsi</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.persepsi}
                  selectedValues={formConfig.persepsi}
                  onChange={(val: any) => updateForm('persepsi', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>8. Proses Pikir</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.prosesPikir}
                  selectedValues={formConfig.prosesPikir}
                  onChange={(val: any) => updateForm('prosesPikir', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>9. Isi Pikiran</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.isiPikiran}
                  selectedValues={formConfig.isiPikiran}
                  onChange={(val: any) => updateForm('isiPikiran', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>10. Waham</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.waham}
                  selectedValues={formConfig.waham}
                  onChange={(val: any) => updateForm('waham', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>11. Tingkat Kesadaran</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.tingkatKesadaran}
                  selectedValues={formConfig.tingkatKesadaran}
                  onChange={(val: any) => updateForm('tingkatKesadaran', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>12. Memori</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.memori}
                  selectedValues={formConfig.memori}
                  onChange={(val: any) => updateForm('memori', val)}
                />
              </div>

              <div className="space-y-1">
                <Label>13. Tingkat Konsentrasi dan Berhitung</Label>
                <CheckboxGroup
                  options={STATUS_MENTAL_OPTIONS.tingkatKonsentrasi}
                  selectedValues={formConfig.tingkatKonsentrasi}
                  onChange={(val: any) => updateForm('tingkatKonsentrasi', val)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <Label>14. Kemampuan Evaluasi</Label>
                  <Select
                    value={formConfig.kemampuanEvaluasi}
                    onChange={(e: any) => updateForm('kemampuanEvaluasi', e.target.value)}
                    options={DROPDOWNS_STATUS_MENTAL.kemampuanEvaluasi}
                  />
                </div>
                <div className="space-y-1">
                  <Label>15. Daya Tilik Diri</Label>
                  <Select
                    value={formConfig.dayaTilikDiri}
                    onChange={(e: any) => updateForm('dayaTilikDiri', e.target.value)}
                    options={DROPDOWNS_STATUS_MENTAL.dayaTilikDiri}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB: DIAGNOSTIK & EDUKASI */}
        {activeTab === 'diag' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">I. Data Diagnostik</h2>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Label>Laboratorium</Label>
                  <input
                    type="text"
                    value={formConfig.lab}
                    placeholder="Contoh: Periksa Narkoba 6 paket..."
                    onChange={(e) => updateForm('lab', e.target.value)}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Label>Radiologi</Label>
                  <input
                    type="text"
                    value={formConfig.rad}
                    onChange={(e) => updateForm('rad', e.target.value)}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Label>Lain-lain</Label>
                  <textarea
                    value={formConfig.lainlain}
                    onChange={(e) => updateForm('lainlain', e.target.value)}
                    rows={2}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mt-4">
              <div className="mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">J. Kebutuhan Edukasi</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>1. Apa yang saudara ketahui tentang penyakit saudara:</Label>
                  <textarea
                    value={formConfig.edukasi1}
                    onChange={(e) => updateForm('edukasi1', e.target.value)}
                    rows={2}
                    placeholder="Tuliskan pengetahuan pasien..."
                    className="w-full p-2 text-sm border border-slate-300 rounded bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <Label>2. Informasi apa yang ingin saudara ketahui / yang diperlukan:</Label>
                  <textarea
                    value={formConfig.edukasi2}
                    onChange={(e) => updateForm('edukasi2', e.target.value)}
                    rows={2}
                    placeholder="Tuliskan kebutuhan informasi pasien..."
                    className="w-full p-2 text-sm border border-slate-300 rounded bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <Label>3. Siapa dari keluarga yang akan ikut terlibat dalam perawatan selanjutnya:</Label>
                  <input
                    type="text"
                    value={formConfig.edukasi3}
                    onChange={(e) => updateForm('edukasi3', e.target.value)}
                    placeholder="Nama anggota keluarga..."
                    className="w-full p-2 text-sm border border-slate-300 rounded bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: KOPING & DIAGNOSIS */}
        {activeTab === 'koping' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">K. Mekanisme Koping</h2>
              </div>
              <CheckboxGroup
                options={KOPING_OPTIONS}
                selectedValues={formConfig.mekanismeKoping}
                onChange={(val: any) => updateForm('mekanismeKoping', val)}
              />
            </section>

            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mt-4">
              <div className="mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">L. Perencanaan Pulang (Discharge Planning)</h2>
              </div>
              <CheckboxGroup
                options={PULANG_OPTIONS}
                selectedValues={formConfig.perencanaanPulang}
                onChange={(val: any) => updateForm('perencanaanPulang', val)}
              />
            </section>

            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mt-4">
              <div className="mb-4 border-l-4 border-blue-600 pl-2">
                <h2 className="text-xs font-bold text-blue-800 uppercase m-0 leading-none">M. Diagnosis Keperawatan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {DIAGNOSIS_OPTIONS.map((opt) => (
                  <label key={opt} className="peer flex items-start p-2 hover:bg-slate-50 border border-slate-200 rounded cursor-pointer transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                    <div className="flex items-center h-4 mt-0.5">
                      <input
                        type="checkbox"
                        checked={formConfig.diagnosisKeperawatan.includes(opt)}
                        onChange={() => {
                          if (formConfig.diagnosisKeperawatan.includes(opt)) {
                            updateForm('diagnosisKeperawatan', formConfig.diagnosisKeperawatan.filter((v: string) => v !== opt));
                          } else {
                            updateForm('diagnosisKeperawatan', [...formConfig.diagnosisKeperawatan, opt]);
                          }
                        }}
                        className="w-3.5 h-3.5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-1"
                      />
                    </div>
                    <span className="ml-2 text-xs font-semibold text-slate-800 leading-tight pt-0.5">{opt}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: REPORT */}
        {activeTab === 'report' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-900">RINGKASAN PENGKAJIAN KEPERAWATAN</h2>
                <div className="flex gap-4 text-xs opacity-80 mt-1">
                  <span><strong>Status:</strong> Pengkajian EMR</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase">TGL CETAK</p>
                <p className="text-sm font-medium text-slate-900">{new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
              </div>
            </div>

            <div className="space-y-6">
              <ReportSection title="1. Nutrisi & Fungsional">
                <ReportItem label="Penurunan BB Tidak Direncanakan" value={NUTRISI_1_OPTIONS.find(o => o.value === formConfig.nutrisi1)?.label || "-"} />
                <ReportItem label="Asupan Makan Buruk" value={formConfig.nutrisi2 === "1" ? "Ya" : (formConfig.nutrisi2 === "0" ? "Tidak" : "-")} />
                <ReportItem label="Sakit Berat" value={formConfig.nutrisi3 === "2" ? "Ya" : (formConfig.nutrisi3 === "0" ? "Tidak" : "-")} />
                <ReportItem label="Skor Status Nutrisi" value={`${nutrisiScore} ${nutrisiScore >= 2 ? '(Risiko Malnutrisi)' : '(Risiko Rendah)'}`} />
                <ReportItem label="Skor Status Fungsional" value={`${funcScore} ${funcScore === 6 ? '(Mandiri)' : funcScore === 0 ? '(Sangat Tergantung)' : '(Ketergantungan Sedang)'}`} />
              </ReportSection>

              <ReportSection title="2. Status Mental">
                <ReportItem label="Penampilan" value={formConfig.penampilan} />
                <ReportItem label="Pembicaraan" value={formConfig.pembicaraan} />
                <ReportItem label="Aktivitas Motorik" value={formConfig.aktivitasMotorik} />
                <ReportItem label="Alam Perasaan" value={formConfig.alamPerasaan} />
                <ReportItem label="Afek" value={formConfig.afek} />
                <ReportItem label="Interaksi Wawancara" value={formConfig.interaksiWawancara} />
                <ReportItem label="Persepsi" value={formConfig.persepsi} />
                <ReportItem label="Proses Pikir" value={formConfig.prosesPikir} />
                <ReportItem label="Isi Pikiran" value={formConfig.isiPikiran} />
                <ReportItem label="Waham" value={formConfig.waham} />
                <ReportItem label="Tingkat Kesadaran" value={formConfig.tingkatKesadaran} />
                <ReportItem label="Memori" value={formConfig.memori} />
                <ReportItem label="Konsentrasi/Berhitung" value={formConfig.tingkatKonsentrasi} />
                <ReportItem label="Kemampuan Evaluasi" value={formConfig.kemampuanEvaluasi} />
                <ReportItem label="Daya Tilik Diri" value={formConfig.dayaTilikDiri} />
              </ReportSection>

              <ReportSection title="3. Diagnostik & Edukasi">
                <ReportItem label="Laboratorium" value={formConfig.lab} />
                <ReportItem label="Radiologi" value={formConfig.rad} />
                <ReportItem label="Lain-lain" value={formConfig.lainlain} />
                <ReportItem label="Edukasi - Pengetahuan Penyakit" value={formConfig.edukasi1} fullWidth />
                <ReportItem label="Edukasi - Kebutuhan Informasi" value={formConfig.edukasi2} fullWidth />
                <ReportItem label="Keluarga yang Terlibat" value={formConfig.edukasi3} fullWidth />
              </ReportSection>

              <ReportSection title="4. Koping & Rencana">
                <ReportItem label="Mekanisme Koping" value={formConfig.mekanismeKoping} />
                <ReportItem label="Perencanaan Pulang" value={formConfig.perencanaanPulang} />
                <div className="md:col-span-2 mt-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Diagnosis Keperawatan</div>
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded">
                    {formConfig.diagnosisKeperawatan.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {formConfig.diagnosisKeperawatan.map((diag: string) => (
                           <li key={diag} className="text-sm font-semibold text-blue-900">{diag}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-slate-500 italic">Belum ada diagnosis yang dipilih.</div>
                    )}
                  </div>
                </div>
              </ReportSection>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
               <div className="text-center">
                  <p className="text-xs text-slate-500 mb-8">Perawat yang mengkaji</p>
                  <p className="border-b border-slate-400 w-48 mx-auto"></p>
                  <p className="text-xs text-slate-700 mt-1">Nama / Tanda Tangan</p>
               </div>
            </div>
          </div>
        </div>
        )}
        
        {/* Tombol Simpan (Bottom, not floating) */}
        {activeTab !== 'report' && (
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 h-10 px-8 py-2 shadow-sm"
            >
              {isSaved ? <CheckCircle className="w-5 h-5 mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              {isSaved ? 'TERSIMPAN' : 'SIMPAN DRAFT'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

type Form = {
  land_size_m2: string;
  building_size_m2: string;
  bedrooms: string;
  bathrooms: string;
  building_age: string;
  district: string;
  city: string;
  property_type: string;
  certificate: string;
  furnishing: string;
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    land_size_m2: "",
    building_size_m2: "",
    bedrooms: "",
    bathrooms: "",
    building_age: "",
    district: "",
    city: "",
    property_type: "",
    certificate: "",
    furnishing: "",
  });

  useEffect(() => {
    if (form.city) {
      fetch(`/${form.city}.json`)
        .then((res) => res.json())
        .then((data) => setDistricts(data));
    }
  }, [form.city]);

  const [result, setResult] = useState<{
    formatted_price: string;
    predicted_price: number;
  }>({
    formatted_price: "",
    predicted_price: 0,
  });

  const [districts, setDistricts] = useState([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult({
      formatted_price: "",
      predicted_price: 0
    })
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 h-screen flex items-center justify-center">
      <div className="card bg-base-100 max-w-4xl shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <h1 className="card-title">Prediksi Harga Rumah</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="">
                  Luas tanah (m²)
                </label>
                <input
                  className="input w-full"
                  type="number"
                  placeholder="Luas tanah (m²)"
                  name="land_size_m2"
                  value={form.land_size_m2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="">
                  Luas bangunan (m²)
                </label>
                <input
                  className="input w-full"
                  type="number"
                  placeholder="Luas bangunan (m²)"
                  name="building_size_m2"
                  value={form.building_size_m2}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="">
                  Jumlah kamar tidur
                </label>
                <input
                  className="input w-full"
                  type="number"
                  placeholder="Jumlah kamar tidur"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="">
                  Jumlah kamar mandi
                </label>
                <input
                  className="input w-full"
                  type="number"
                  placeholder="Jumlah kamar mandi"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="">
                  Umur bangunan (tahun)
                </label>
                <input
                  className="input w-full"
                  type="number"
                  placeholder="Umur bangunan (tahun)"
                  name="building_age"
                  value={form.building_age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Kota</label>
                <select
                  className="select w-full"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Kota</option>
                  <option>Bekasi</option>
                  <option>Bogor</option>
                  <option>Depok</option>
                  <option>Jakarta Barat</option>
                  <option>Jakarta Selatan</option>
                  <option>Jakarta Utara</option>
                  <option>Jakarta Timur</option>
                  <option>Jakarta Pusat</option>
                  <option>Tangerang</option>
                </select>
              </div>
              <div>
                <label className="label">Distrik</label>
                <select
                  className="select w-full"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  required
                >
                  {districts.map((data, i) => (
                    <option key={i} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Tipe Properti</label>
                <select
                  className="select w-full"
                  name="property_type"
                  value={form.property_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Tipe</option>
                  <option value="rumah">Rumah</option>
                </select>
              </div>
              <div>
                <label className="label">Sertifikat</label>
                <select
                  className="select w-full"
                  name="certificate"
                  value={form.certificate}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Sertifikat</option>
                  <option value="shm - sertifikat hak milik">
                    shm - sertifikat hak milik
                  </option>
                  <option value="hgb - hak guna bangunan">
                    hgb - hak guna bangunan
                  </option>
                  <option value="lainnya (ppjb,girik,adat,dll)">
                    lainnya (ppjb,girik,adat,dll)
                  </option>
                  <option value="hp - hak pakai">hp - hak pakai</option>
                </select>
              </div>

              <div>
                <label className="label">Furnishing</label>
                <select
                  className="select w-full"
                  name="furnishing"
                  value={form.furnishing}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Furnishing</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi furnished">Semi Furnished</option>
                  <option value="furnished">Fully Furnished</option>
                  <option value="baru">baru</option>
                </select>
              </div>
            </div>
            <hr className="text-base-300" />
            {result.formatted_price != "" ? (
              <div role="alert" className="alert alert-success">
                <span className="font-bold">Prediksi Harga</span>
                <span>{result.formatted_price}</span>
              </div>
            ) : (
              ""
            )}
            <div className="card-actions flex justify-end mt-3">
              <button className="btn btn-primary" type="submit">
                Prediksi Sekarang
                {isLoading && <span className="loading loading-spinner"></span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

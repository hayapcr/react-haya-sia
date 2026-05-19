import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Badge from "../components/Badge";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Table from "../components/Table";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";

export default function Components() {

  const headers = [
    "No",
    "Nama Produk",
    "Kategori",
    "Harga",
    "Aksi"
  ];

  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <Container className="bg-gray-100">

      {/* HEADER */}
      <PageHeader
        title={
          <span className="text-3xl font-bold text-gray-800">
            Components
          </span>
        }
        breadcrumb={["Dashboard", "Components"]}
      />

      {/* BASIC COMPONENTS */}
      <section className="mt-6 space-y-4">

        <div className="flex gap-2 flex-wrap">
          <Button type="primary">Edit</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="success">Simpan</Button>
          <Button type="danger">Hapus</Button>
          <Button type="warning">Warning</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge type="primary">Primary</Badge>
          <Badge type="secondary">Secondary</Badge>
          <Badge type="success">Success</Badge>
          <Badge type="danger">Danger</Badge>
          <Badge type="warning">Warning</Badge>
        </div>

        <div className="flex gap-2">
          <Avatar name="Budi" />
          <Avatar name="Siti" />
        </div>

      </section>

      {/* CARD */}
      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-bold">Judul Card</h2>
          <p className="text-gray-600">Ini adalah isi dari card</p>
        </Card>
      </div>

      {/* SECTION TITLE */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Daftar Produk
        </h1>
        <p className="text-gray-600 mt-1">
          Berikut adalah daftar produk terbaru.
        </p>
      </div>

      {/* PRODUCT CARD */}
      <div className="mt-6 space-y-4">
        <ProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          title="Sepatu Sport"
          category="Fashion"
          price="Rp 450.000"
          description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          title="Smartphone"
          category="Elektronik"
          price="Rp 4.500.000"
          description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          title="Nike Shoes"
          price="Rp 1.200.000"
        />
      </div>

      {/* SECTIONS */}
      <div className="mt-12 space-y-10">
        <HeroSection />
        <FeatureSection />
      </div>

      {/* TABLE */}
      <div className="mt-12">
        <Table headers={headers}>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* FORM */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Form Component</h2>

        <div className="space-y-4">
          <InputField label="Nama" placeholder="Masukkan nama" />
          <InputField label="Email" type="email" placeholder="Masukkan email" />
          <TextArea label="Alamat" placeholder="Masukkan alamat lengkap" />

          <SelectField
            label="Kategori"
            options={["Elektronik", "Fashion", "Aksesoris"]}
          />
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Feedback Component</h2>

        <div className="space-y-2">
          <Alert type="success" message="Data berhasil disimpan!" />
          <Alert type="error" message="Terjadi kesalahan sistem!" />
          <Alert type="warning" message="Perhatian: data belum lengkap!" />
        </div>

        <div className="mt-3">
          <Loading />
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-12">
        <Footer />
      </div>

    </Container>
  );
}
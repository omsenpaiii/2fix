"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Package,
  LogOut,
  ImagePlus,
  Check,
  X,
  ChevronDown,
  Tag,
  DollarSign,
  FileText,
  List,
} from "lucide-react";
import { useProductStore, Product } from "@/lib/productStore";
import { CATEGORIES } from "@/lib/products";

export default function AdminPanelPage() {
  const router = useRouter();
  const { products, addProduct, removeProduct } = useProductStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAuthed, setIsAuthed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Auth check
  useEffect(() => {
    const auth = sessionStorage.getItem("2fix-admin-auth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("2fix-admin-auth");
    router.push("/admin");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setFeatures("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category || !description) return;

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name,
      price: parseFloat(price),
      image: imagePreview || "/products/File 1.jpeg", // fallback to an existing image
      category,
      description,
      features: features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    addProduct(newProduct);
    resetForm();
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    removeProduct(id);
    setDeleteConfirm(null);
  };

  const categoryNames = CATEGORIES.map((c) => c.name);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1209] to-[#0f0f0f] text-white">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-500/10 border border-green-500/30 backdrop-blur-xl rounded-2xl px-6 py-4 flex items-center gap-3 shadow-2xl animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-green-300 text-sm font-medium">
            Product added successfully!
          </span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-28">
              <Image
                src="/logo.png"
                alt="2Fix Logo"
                fill
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>
            <div className="hidden sm:block h-6 w-px bg-white/10" />
            <span className="hidden sm:block text-xs font-semibold text-white/40 uppercase tracking-widest">
              Admin Panel
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors text-sm font-medium group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-white/40 text-sm mt-1">
              {products.length} total products across {categoryNames.length}{" "}
              categories
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            {showForm ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Product
              </>
            )}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="mb-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20 animate-fade-in">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-orange" />
              New Product
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Personalized Wine Glass"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.07] transition-all text-sm"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" /> Price (AUD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.07] transition-all text-sm"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <List className="w-3 h-3" /> Category
                  </label>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdown(!categoryDropdown)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-left text-sm focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.07] transition-all flex items-center justify-between"
                  >
                    <span
                      className={category ? "text-white" : "text-white/20"}
                    >
                      {category || "Select a category"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/30 transition-transform ${categoryDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  {categoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                      {categoryNames.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setCategory(cat);
                            setCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${
                            category === cat
                              ? "text-brand-orange bg-brand-orange/5"
                              : "text-white/70"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <ImagePlus className="w-3 h-3" /> Product Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white/5 border border-dashed border-white/10 rounded-xl px-4 py-3.5 text-sm cursor-pointer hover:border-brand-orange/30 hover:bg-white/[0.07] transition-all flex items-center gap-3"
                  >
                    {imagePreview ? (
                      <div className="flex items-center gap-3 w-full">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-white/60 truncate">
                          {imageFile?.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setImageFile(null);
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="ml-auto text-white/30 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-white/20">
                        Click to upload image...
                      </span>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3 h-3" /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the product in detail..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.07] transition-all text-sm resize-none"
                  required
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                  <List className="w-3 h-3" /> Features{" "}
                  <span className="text-white/20 normal-case tracking-normal">
                    (one per line)
                  </span>
                </label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder={"Feature 1\nFeature 2\nFeature 3"}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.07] transition-all text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-8 py-3 rounded-xl transition-all text-sm shadow-lg shadow-brand-orange/20"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products by Category */}
        {categoryNames.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;

          return (
            <section key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-brand-orange rounded-full" />
                <h2 className="text-xl font-bold tracking-tight">{cat}</h2>
                <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                  {catProducts.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all hover:bg-white/[0.05]"
                  >
                    <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-white/90 mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-brand-orange font-bold text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-white/30 text-xs mt-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-white/20 uppercase tracking-wider">
                          {product.id}
                        </span>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-400 hover:text-red-300 text-xs font-medium px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-white/30 hover:text-white/50 text-xs font-medium px-2 py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Products that don't match any category */}
        {(() => {
          const uncategorized = products.filter(
            (p) => !categoryNames.includes(p.category)
          );
          if (uncategorized.length === 0) return null;
          return (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-white/20 rounded-full" />
                <h2 className="text-xl font-bold tracking-tight">Other</h2>
                <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                  {uncategorized.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {uncategorized.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all hover:bg-white/[0.05]"
                  >
                    <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-white/90 mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-brand-orange font-bold text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-white/20 uppercase tracking-wider">
                          {product.id}
                        </span>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-400 hover:text-red-300 text-xs font-medium px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-white/30 hover:text-white/50 text-xs font-medium px-2 py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}
      </main>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

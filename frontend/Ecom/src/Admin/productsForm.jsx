import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../Services/productService";
import { getMenu } from '../Services/menuService'
import { Plus, X } from "lucide-react";

function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

   const [products, setProducts] = useState([]);
  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    sku: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    parent: "",
    variants: [],
    featured: false,
  });

  // =====================================================
  // IMAGE
  // =====================================================

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =====================================================
  // GALLERY
  // =====================================================

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  // =====================================================
  // VARIANT INPUT
  // =====================================================

  const [variantInput, setVariantInput] = useState({
    size: "",
    color: "",
    stock: "",
  });

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {

  const fetchData = async () => {

    try {

      // ==========================================
      // GET MENU
      // ==========================================

      const menuData = await getMenu();

      console.log("ALL MENUS:", menuData);

      const allMenus = menuData.menu || [];


      // ==========================================
      // ONLY TOP-LEVEL MENUS = CATEGORIES
      // ==========================================

      const categoryMenus = allMenus.filter(
  (menu) => menu.parent
);

console.log("PRODUCT CATEGORIES:", categoryMenus);

setCategories(categoryMenus);

      // ==========================================
      // CREATE MODE
      // ==========================================

      if (!isEditMode) {

        setLoading(false);

        return;
      }


      // ==========================================
      // EDIT MODE
      // ==========================================

      const data = await getProductById(id);

      console.log(
        "PRODUCT FOR EDIT:",
        data
      );

      const product = data?.product;


      if (!product) {

        alert("Product not found.");

        navigate("/admin/products");

        return;
      }


      // ==========================================
      // SET PRODUCT DATA
      // ==========================================

      setFormData({

        title: product.title || "",

        subTitle: product.subTitle || "",

        sku: product.sku || "",

        shortDescription:
          product.shortDescription || "",

        description:
          product.description || "",

        price:
          product.price ?? "",

        discountPrice:
          product.discountPrice ?? "",

        category:
          product.category || "",

        variants:
          Array.isArray(product.variants)
            ? product.variants.map(
                (variant) => ({
                  _id: variant._id,

                  sku:
                    variant.sku || "",

                  size:
                    variant.size || "",

                  color:
                    variant.color || "",

                  stock:
                    Number(
                      variant.stock
                    ) || 0,
                })
              )
            : [],

        featured:
          Boolean(product.featured),

      });


      // ==========================================
      // IMAGE
      // ==========================================

      setImagePreview(
        product.image || ""
      );


      // ==========================================
      // GALLERY
      // ==========================================

      setExistingGallery(
        Array.isArray(product.gallery)
          ? product.gallery
          : []
      );


    } catch (error) {

      console.error(
        "Failed to load product data:",
        error
      );

      alert(
        "Failed to load product data."
      );


      if (isEditMode) {

        navigate(
          "/admin/products"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  fetchData();

}, [id, isEditMode, navigate]);

  // =====================================================
  // NORMAL INPUTS
  // =====================================================
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "parent") {
    const selectedParent = products.find(
      (product) => product._id === value
    );

    setFormData((prev) => ({
      ...prev,
      parent: value,
      category: selectedParent
        ? selectedParent.category
        : "",
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // =====================================================
  // FEATURED
  // =====================================================

  const handleFeaturedChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      featured: e.target.checked,
    }));
  };

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =====================================================
  // GALLERY
  // =====================================================

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setGalleryFiles((prev) => [
      ...prev,
      ...files,
    ]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryPreviews((prev) => [
      ...prev,
      ...previews,
    ]);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE NEW GALLERY IMAGE
  // =====================================================

  const removeGalleryFile = (index) => {
    setGalleryFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setGalleryPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =====================================================
  // REMOVE EXISTING GALLERY IMAGE
  // =====================================================

  const removeExistingGallery = (index) => {
    setExistingGallery((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =====================================================
  // VARIANT INPUT
  // =====================================================

  const handleVariantInputChange = (e) => {
    const { name, value } = e.target;

    setVariantInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // GENERATE VARIANT SKU
  // =====================================================

  const generateVariantSku = (size, color) => {
    const parentSku = formData.sku
      .trim()
      .toUpperCase();

    const sizeCode = size
      .trim()
      .replace(/\s+/g, "-")
      .toUpperCase();

    const colorCode = color
      .trim()
      .replace(/\s+/g, "-")
      .toUpperCase();

    return `${parentSku}-${sizeCode}-${colorCode}`;
  };

  // =====================================================
  // ADD VARIANT
  // =====================================================

  const addVariant = () => {
    const {
      size,
      color,
      stock,
    } = variantInput;

    if (!formData.sku.trim()) {
      alert(
        "Please enter Product SKU first."
      );
      return;
    }

    if (!size.trim()) {
      alert("Please enter a size.");
      return;
    }

    if (!color.trim()) {
      alert("Please enter a color.");
      return;
    }

    if (stock === "") {
      alert("Please enter stock.");
      return;
    }

    const numericStock = Number(stock);

    if (
      Number.isNaN(numericStock) ||
      numericStock < 0
    ) {
      alert(
        "Stock must be a valid number."
      );
      return;
    }

    // Check duplicate size + color
    const exists = formData.variants.some(
      (variant) =>
        variant.size?.toLowerCase() ===
          size.trim().toLowerCase() &&
        variant.color?.toLowerCase() ===
          color.trim().toLowerCase()
    );

    if (exists) {
      alert(
        "This size and color combination already exists."
      );
      return;
    }

    const variantSku = generateVariantSku(
      size,
      color
    );

    const newVariant = {
      sku: variantSku,
      size: size.trim(),
      color: color.trim(),
      stock: numericStock,
    };

    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        newVariant,
      ],
    }));

    setVariantInput({
      size: "",
      color: "",
      stock: "",
    });
  };

  // =====================================================
  // REMOVE VARIANT
  // =====================================================

  const removeVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =====================================================
  // UPDATE VARIANT STOCK
  // =====================================================

  const updateVariantStock = (
    index,
    value
  ) => {
    const stock = Number(value);

    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map(
        (variant, i) =>
          i === index
            ? {
                ...variant,
                stock:
                  Number.isNaN(stock)
                    ? 0
                    : stock,
              }
            : variant
      ),
    }));
  };

  // =====================================================
  // UPDATE VARIANT SIZE
  // =====================================================

  const updateVariantSize = (
    index,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map(
        (variant, i) =>
          i === index
            ? {
                ...variant,
                size: value,
              }
            : variant
      ),
    }));
  };

  // =====================================================
  // UPDATE VARIANT COLOR
  // =====================================================

  const updateVariantColor = (
    index,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map(
        (variant, i) =>
          i === index
            ? {
                ...variant,
                color: value,
              }
            : variant
      ),
    }));
  };

  // =====================================================
  // REGENERATE EXISTING VARIANT SKU
  // =====================================================

  const regenerateVariantSku = (index) => {
    setFormData((prev) => ({
      ...prev,

      variants: prev.variants.map(
        (variant, i) => {
          if (i !== index) {
            return variant;
          }

          return {
            ...variant,
            sku: generateVariantSku(
              variant.size,
              variant.color
            ),
          };
        }
      ),
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!formData.title.trim()) {
      alert("Please enter product title.");
      return;
    }

    if (!formData.sku.trim()) {
      alert("Please enter product SKU.");
      return;
    }

    if (!formData.variants.length) {
      alert(
        "Please add at least one variant."
      );
      return;
    }

    if (!isEditMode && !imageFile) {
      alert(
        "Please select a product image."
      );
      return;
    }

    // Check variant data
    for (const variant of formData.variants) {
      if (!variant.sku) {
        alert(
          "Every variant must have an SKU."
        );
        return;
      }

      if (!variant.size?.trim()) {
        alert(
          "Every variant must have a size."
        );
        return;
      }

      if (!variant.color?.trim()) {
        alert(
          "Every variant must have a color."
        );
        return;
      }
    }

    setSaving(true);

    try {
      const data = new FormData();

      // =================================================
      // PRODUCT INFORMATION
      // =================================================

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "subTitle",
        formData.subTitle.trim()
      );

      data.append(
        "sku",
        formData.sku.trim()
      );

      data.append(
        "shortDescription",
        formData.shortDescription.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "price",
        String(formData.price)
      );

      data.append(
        "discountPrice",
        String(formData.discountPrice)
      );

      data.append(
        "category",
        formData.category.trim()
      );

      data.append(
        "featured",
        String(formData.featured)
      );

      // =================================================
      // VARIANTS
      // =================================================

      const cleanVariants =
        formData.variants.map(
          (variant) => ({
            // Do not send Mongo _id when creating
            ...(variant._id
              ? { _id: variant._id }
              : {}),

            sku: variant.sku,
            size: variant.size.trim(),
            color: variant.color.trim(),
            stock: Number(variant.stock),
          })
        );

      data.append(
        "variants",
        JSON.stringify(cleanVariants)
      );

      // =================================================
      // MAIN IMAGE
      // =================================================

      if (imageFile) {
        data.append(
          "image",
          imageFile
        );
      }

      // =================================================
      // NEW GALLERY
      // =================================================

      galleryFiles.forEach((file) => {
        data.append(
          "gallery",
          file
        );
      });

      // =================================================
      // EXISTING GALLERY
      // =================================================

      data.append(
        "existingGallery",
        JSON.stringify(
          existingGallery
        )
      );

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "========== SUBMITTING PRODUCT =========="
      );

      for (const [
        key,
        value,
      ] of data.entries()) {
        console.log(
          key,
          value
        );
      }

      // =================================================
      // CREATE
      // =================================================

      if (!isEditMode) {
        await createProduct(data);
      }

      // =================================================
      // UPDATE
      // =================================================

      else {
        await updateProduct(
          id,
          data
        );
      }

      alert(
        isEditMode
          ? "Product updated successfully."
          : "Product created successfully."
      );

      navigate(
        "/admin/products"
      );
    } catch (error) {
      console.error(
        "Failed to save product:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">
          Loading product...
        </p>
      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen w-full mt-16 bg-stone-50 py-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl mx-auto bg-white border border-stone-200 rounded-xl shadow-sm p-6"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Product Management
            </p>

            <h2 className="text-2xl font-serif font-bold text-stone-900">
              {isEditMode
                ? "Edit Product"
                : "Add Product"}
            </h2>

          </div>

          {isEditMode && (
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded">
              Editing
            </span>
          )}

        </div>


        <div className="space-y-7">

          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <div>

            <label
              htmlFor="image"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Main Product Image
            </label>

            {imagePreview && (
              <div className="mb-3">

                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-40 h-40 object-cover rounded-lg border border-stone-200"
                />

              </div>
            )}

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={
                handleImageFileChange
              }
              className="w-full text-sm border border-stone-300 rounded-lg p-2"
            />

            {isEditMode && (
              <p className="text-xs text-stone-400 mt-1">
                Leave empty to keep the current image.
              </p>
            )}

          </div>


          {/* =================================================
              GALLERY
          ================================================= */}

          <div>

            <label
              htmlFor="gallery"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Gallery Images
            </label>

            <input
              id="gallery"
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleGalleryChange
              }
              className="w-full text-sm border border-stone-300 rounded-lg p-2"
            />


            {/* EXISTING */}

            {existingGallery.length > 0 && (
              <div className="mt-5">

                <p className="text-xs text-stone-500 mb-3">
                  Existing Gallery
                </p>

                <div className="flex flex-wrap gap-4">

                  {existingGallery.map(
                    (image, index) => (

                      <div
                        key={`${image}-${index}`}
                        className="relative"
                      >

                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeExistingGallery(
                              index
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={13} />
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>
            )}


            {/* NEW */}

            {galleryPreviews.length > 0 && (
              <div className="mt-5">

                <p className="text-xs text-stone-500 mb-3">
                  New Gallery Images
                </p>

                <div className="flex flex-wrap gap-4">

                  {galleryPreviews.map(
                    (image, index) => (

                      <div
                        key={`${image}-${index}`}
                        className="relative"
                      >

                        <img
                          src={image}
                          alt={`New gallery ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryFile(
                              index
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={13} />
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>
            )}

          </div>


          {/* =================================================
              TITLE
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Product Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Premium Football MatchKit"
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg outline-none focus:border-indigo-500"
            />

          </div>


          {/* =================================================
              SUBTITLE
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Subtitle
            </label>

            <input
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              required
              placeholder="Football Match H/A Kits"
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg outline-none focus:border-indigo-500"
            />

          </div>


          {/* =================================================
              SKU
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Product SKU
            </label>

            <input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              placeholder="FB-101"
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg outline-none focus:border-indigo-500"
            />

            <p className="text-xs text-stone-400 mt-1">
              Variant SKUs are generated from this SKU.
            </p>

          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="5000"
                className="w-full px-3 py-2.5 border border-stone-300 rounded-lg"
              />

            </div>


            <div>

              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Discount Price
              </label>

              <input
                name="discountPrice"
                type="number"
                min="0"
                value={formData.discountPrice}
                onChange={handleChange}
                required
                placeholder="3500"
                className="w-full px-3 py-2.5 border border-stone-300 rounded-lg"
              />

            </div>

          </div>


          {/* =================================================
              CATEGORY
          ================================================= */}

          <div>

  <label className="block text-sm font-semibold text-stone-700 mb-2">
    Category
  </label>

  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
    className="w-full px-3 py-2.5 border border-stone-300 rounded-lg bg-white"
  >

    <option value="">
      Select Category
    </option>

    {categories.map((category) => (

      <option
        key={category._id}
        value={category.title}
      >
        {category.title}
      </option>

    ))}

  </select>

</div>


          {/* =================================================
              VARIANTS
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-3">
              Product Variants
            </label>

            {/* ADD VARIANT */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <input
                name="size"
                type="text"
                value={variantInput.size}
                onChange={
                  handleVariantInputChange
                }
                placeholder="Size e.g. Medium"
                className="px-3 py-2.5 border border-stone-300 rounded-lg"
              />

              <input
                name="color"
                type="text"
                value={variantInput.color}
                onChange={
                  handleVariantInputChange
                }
                placeholder="Color e.g. Red"
                className="px-3 py-2.5 border border-stone-300 rounded-lg"
              />

              <input
                name="stock"
                type="number"
                min="0"
                value={variantInput.stock}
                onChange={
                  handleVariantInputChange
                }
                placeholder="Stock"
                className="px-3 py-2.5 border border-stone-300 rounded-lg"
              />

            </div>


            <button
              type="button"
              onClick={addVariant}
              className="mt-3 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700"
            >
              <Plus size={16} />
              Add Variant
            </button>


            {/* =================================================
                VARIANT TABLE
            ================================================= */}

            {formData.variants.length > 0 && (

              <div className="mt-5 border border-stone-200 rounded-lg overflow-hidden">

                {/* HEADER */}

                <div className="grid grid-cols-5 bg-stone-100 px-4 py-3 text-xs font-semibold text-stone-600">

                  <span>
                    Variant SKU
                  </span>

                  <span>
                    Size
                  </span>

                  <span>
                    Color
                  </span>

                  <span>
                    Stock
                  </span>

                  <span>
                    Action
                  </span>

                </div>


                {/* ROWS */}

                {formData.variants.map(
                  (variant, index) => (

                    <div
                      key={`${variant._id || "new"}-${index}`}
                      className="grid grid-cols-5 gap-3 items-center px-4 py-3 border-t border-stone-200"
                    >

                      {/* SKU */}

                      <div>

                        <p className="text-sm font-medium text-stone-900 break-all">
                          {variant.sku}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            regenerateVariantSku(
                              index
                            )
                          }
                          className="text-[11px] text-indigo-600 hover:underline mt-1"
                        >
                          Regenerate
                        </button>

                      </div>


                      {/* SIZE */}

                      <input
                        type="text"
                        value={
                          variant.size
                        }
                        onChange={(e) =>
                          updateVariantSize(
                            index,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded"
                      />


                      {/* COLOR */}

                      <input
                        type="text"
                        value={
                          variant.color
                        }
                        onChange={(e) =>
                          updateVariantColor(
                            index,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded"
                      />


                      {/* STOCK */}

                      <input
                        type="number"
                        min="0"
                        value={
                          variant.stock
                        }
                        onChange={(e) =>
                          updateVariantStock(
                            index,
                            e.target.value
                          )
                        }
                        className="w-24 px-2 py-1.5 text-sm border border-stone-300 rounded"
                      />


                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeVariant(
                            index
                          )
                        }
                        className="justify-self-end text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =================================================
              SHORT DESCRIPTION
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Short Description
            </label>

            <textarea
              name="shortDescription"
              value={
                formData.shortDescription
              }
              onChange={handleChange}
              rows="3"
              required
              placeholder="Short product description..."
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg"
            />

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
              placeholder="Detailed product description..."
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg"
            />

          </div>


          {/* =================================================
              FEATURED
          ================================================= */}

          <div className="flex items-center gap-3">

            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={
                handleFeaturedChange
              }
              className="w-4 h-4"
            />

            <label
              htmlFor="featured"
              className="text-sm font-medium text-stone-700"
            >
              Featured Product
            </label>

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex items-center gap-3 mt-10">

          <button
            type="submit"
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg transition disabled:opacity-50"
          >

            {saving ? (
              "Saving..."
            ) : isEditMode ? (
              "Update Product"
            ) : (
              <>
                <Plus size={17} />
                Add Product
              </>
            )}

          </button>


          <button
            type="button"
            disabled={saving}
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
            className="inline-flex items-center justify-center gap-2 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold px-5 py-3 rounded-lg"
          >

            <X size={17} />

            Cancel

          </button>

        </div>

      </form>

    </div>
  );
}

export default ProductForm;
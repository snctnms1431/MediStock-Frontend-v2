
import React, { useState, useEffect } from 'react';
import {
    X,
    Pill,
    Sparkles,
    Package,
    ClipboardList,
    Thermometer,
    Truck,
    CalendarDays,
    Barcode,
    ShieldCheck,
    MapPin,
    Layers3,
    Plus,
    Save,
    Info
} from 'lucide-react';
import { StorageCondition } from '../../types';

const inputClass = `
    w-full h-10 px-3.5 rounded-xl
    border border-slate-200 bg-slate-50
    text-sm text-slate-800 placeholder:text-slate-400
    outline-none transition-all duration-200
    hover:border-slate-300
    focus:border-teal-500 focus:bg-white
    focus:ring-4 focus:ring-teal-500/10
    dark:border-slate-700 dark:bg-slate-800/70
    dark:text-slate-100 dark:placeholder:text-slate-500
    dark:hover:border-slate-600
    dark:focus:border-teal-400 dark:focus:bg-slate-800
    dark:focus:ring-teal-400/10
`;

const labelClass = `
    mb-1.5 block text-xs font-semibold
    text-slate-700 dark:text-slate-300
`;

const Field = ({ label, required, hint, children, className = '' }) => (
    <div className={className}>
        <label className={labelClass}>
            {label}
            {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
        {children}
        {hint && (
            <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                {hint}
            </p>
        )}
    </div>
);

const SectionHeader = ({ icon: Icon, title, description, number }) => (
    <div className="mb-4 flex items-center gap-3">
        <div className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl border border-teal-100 bg-teal-50
            text-teal-700
            dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400
        ">
            <Icon size={17} />
        </div>

        <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {title}
                </h4>
                <span className="
                    rounded-md bg-slate-100 px-1.5 py-0.5
                    text-[10px] font-bold text-slate-500
                    dark:bg-slate-800 dark:text-slate-400
                ">
                    {number}
                </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    </div>
);

export const AddEditMedicineModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    suppliers = []
}) => {
    const [formData, setFormData] = useState({
        name: '',
        genericName: '',
        ndc: '',
        category: 'Antibiotics',
        dosageForm: 'Oral Tablet',
        strength: '',
        quantity: 100,
        minQuantity: 20,
        unit: 'Bottles',
        batchNumber: '',
        expiryDate: '',
        storageCondition: StorageCondition.AMBIENT,
        unitPrice: 15.00,
        supplierId: suppliers[0]?.id || '',
        supplierName: suppliers[0]?.name || '',
        location: 'Zone A - Formulary Shelf 1',
        requiresPrescription: true,
        temperatureRequired: '20°C'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                genericName: '',
                ndc: '',
                category: 'Antibiotics',
                dosageForm: 'Oral Tablet',
                strength: '',
                quantity: 50,
                minQuantity: 15,
                unit: 'Bottles',
                batchNumber: `LOT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                storageCondition: StorageCondition.AMBIENT,
                unitPrice: 20.00,
                supplierId: suppliers[0]?.id || '',
                supplierName: suppliers[0]?.name || '',
                location: 'Zone A - Shelf 3',
                requiresPrescription: true,
                temperatureRequired: '21.0°C'
            });
        }
    }, [initialData, suppliers, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedSupp = suppliers.find(
            s => s.id === formData.supplierId
        );

        onSave({
            ...formData,
            supplierName: selectedSupp
                ? selectedSupp.name
                : (formData.supplierName || 'Direct Distributor')
        });
    };

    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isEditing = Boolean(initialData);

    return (
        <div className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-slate-950/60 p-3 backdrop-blur-sm
            animate-fadeIn sm:p-5
        ">
            <div className="
                flex max-h-[94vh] w-full max-w-4xl flex-col
                overflow-hidden rounded-2xl border border-slate-200
                bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]
                dark:border-slate-700 dark:bg-slate-900
                dark:shadow-[0_25px_80px_rgba(0,0,0,0.5)]
            ">

                {/* HEADER */}
                <div className="
                    relative shrink-0 overflow-hidden
                    border-b border-slate-200
                    bg-white px-5 py-4
                    dark:border-slate-800 dark:bg-slate-900
                    sm:px-6
                ">
                    <div className="
                        pointer-events-none absolute -right-10 -top-16
                        h-40 w-40 rounded-full bg-teal-500/5 blur-3xl
                    " />

                    <div className="relative flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="
                                flex h-11 w-11 shrink-0 items-center justify-center
                                rounded-xl bg-gradient-to-br
                                from-teal-500 to-emerald-600
                                text-white shadow-lg shadow-teal-600/20
                            ">
                                {isEditing ? <Pill size={21} /> : <Plus size={22} />}
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                                        {isEditing ? 'Edit Medicine' : 'Add New Medicine'}
                                    </h3>

                                    <span className="
                                        rounded-full border border-teal-200
                                        bg-teal-50 px-2 py-0.5
                                        text-[9px] font-bold uppercase tracking-wider
                                        text-teal-700
                                        dark:border-teal-500/20 dark:bg-teal-500/10
                                        dark:text-teal-400
                                    ">
                                        {isEditing ? 'Update Record' : 'New Entry'}
                                    </span>
                                </div>

                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    Manage medicine details, stock and storage information.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="
                                flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-xl border border-slate-200
                                text-slate-500 transition-all
                                hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600
                                dark:border-slate-700 dark:text-slate-400
                                dark:hover:border-rose-500/30
                                dark:hover:bg-rose-500/10 dark:hover:text-rose-400
                            "
                        >
                            <X size={17} />
                        </button>
                    </div>

                    {/* Progress / section indicators */}
                    <div className="mt-4 flex items-center gap-2">
                        {[
                            { label: 'Medicine', icon: Pill },
                            { label: 'Inventory', icon: Package },
                            { label: 'Storage', icon: Thermometer }
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className="
                                    flex flex-1 items-center justify-center gap-1.5
                                    rounded-lg bg-slate-50 py-2
                                    text-[10px] font-semibold text-slate-600
                                    dark:bg-slate-800/70 dark:text-slate-300
                                "
                            >
                                <item.icon size={13} className="text-teal-600 dark:text-teal-400" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="
                        flex-1 space-y-6 overflow-y-auto
                        bg-slate-50/70 px-5 py-5
                        dark:bg-slate-950/40
                        sm:px-6
                    ">

                        {/* SECTION 1: MEDICINE INFORMATION */}
                        <section className="
                            rounded-2xl border border-slate-200
                            bg-white p-4 shadow-sm
                            dark:border-slate-800 dark:bg-slate-900
                            sm:p-5
                        ">
                            <SectionHeader
                                icon={Pill}
                                title="Medicine Information"
                                description="Basic identification and pharmaceutical details"
                                number="01"
                            />

                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <Field label="Brand / Product Name" required>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => updateField('name', e.target.value)}
                                        placeholder="e.g. Augmentin 625"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Generic Name">
                                    <input
                                        type="text"
                                        value={formData.genericName}
                                        onChange={e => updateField('genericName', e.target.value)}
                                        placeholder="e.g. Amoxicillin + Clavulanic Acid"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field
                                    label="NDC / Product Code"
                                    hint="Enter the product's barcode or identification code"
                                >
                                    <div className="relative">
                                        <Barcode
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            value={formData.ndc}
                                            onChange={e => updateField('ndc', e.target.value)}
                                            placeholder="Enter product code"
                                            className={`${inputClass} pl-9 font-mono`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Therapeutic Category">
                                    <select
                                        value={formData.category}
                                        onChange={e => updateField('category', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="Antibiotics">Antibiotics</option>
                                        <option value="Cardiovascular">Cardiovascular</option>
                                        <option value="Endocrinology / Biologics">Endocrinology / Biologics</option>
                                        <option value="Emergency / Anaphylaxis">Emergency / Anaphylaxis</option>
                                        <option value="Anesthesia / Critical Care">Anesthesia / Critical Care</option>
                                        <option value="Vaccines / Immunology">Vaccines / Immunology</option>
                                        <option value="Analgesics & Antipyretics">Analgesics & Antipyretics</option>
                                    </select>
                                </Field>

                                <Field label="Dosage Form">
                                    <input
                                        type="text"
                                        value={formData.dosageForm}
                                        onChange={e => updateField('dosageForm', e.target.value)}
                                        placeholder="e.g. Tablet, Capsule, Syrup"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Strength / Concentration">
                                    <input
                                        type="text"
                                        value={formData.strength}
                                        onChange={e => updateField('strength', e.target.value)}
                                        placeholder="e.g. 500mg, 100mg/5ml"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* SECTION 2: INVENTORY AND BATCH */}
                        <section className="
                            rounded-2xl border border-slate-200
                            bg-white p-4 shadow-sm
                            dark:border-slate-800 dark:bg-slate-900
                            sm:p-5
                        ">
                            <SectionHeader
                                icon={ClipboardList}
                                title="Inventory & Batch Details"
                                description="Stock quantities, batch traceability and procurement"
                                number="02"
                            />

                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <Field label="Available Quantity" required>
                                    <div className="relative">
                                        <Package
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.quantity}
                                            onChange={e => updateField('quantity', parseInt(e.target.value) || 0)}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>

                                <Field
                                    label="Reorder Level"
                                    required
                                    hint="Alert when stock reaches this quantity"
                                >
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.minQuantity}
                                        onChange={e => updateField('minQuantity', parseInt(e.target.value) || 0)}
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Packaging Unit">
                                    <input
                                        type="text"
                                        value={formData.unit}
                                        onChange={e => updateField('unit', e.target.value)}
                                        placeholder="e.g. Bottles, Vials, Packs"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Unit Acquisition Cost">
                                    <div className="relative">
                                        <span className="
                                            absolute left-3 top-1/2 -translate-y-1/2
                                            text-xs font-bold text-slate-400
                                        ">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={formData.unitPrice}
                                            onChange={e => updateField('unitPrice', parseFloat(e.target.value) || 0)}
                                            className={`${inputClass} pl-8`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Batch / Lot Number" required>
                                    <div className="relative">
                                        <Layers3
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={formData.batchNumber}
                                            onChange={e => updateField('batchNumber', e.target.value)}
                                            placeholder="Enter batch number"
                                            className={`${inputClass} pl-9 font-mono`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Expiry Date" required>
                                    <div className="relative">
                                        <CalendarDays
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="date"
                                            required
                                            value={formData.expiryDate}
                                            onChange={e => updateField('expiryDate', e.target.value)}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>

                                <Field label="Supplier">
                                    <div className="relative">
                                        <Truck
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <select
                                            value={formData.supplierId}
                                            onChange={e => {
                                                const s = suppliers.find(
                                                    sup => sup.id === e.target.value
                                                );

                                                setFormData({
                                                    ...formData,
                                                    supplierId: e.target.value,
                                                    supplierName: s?.name || formData.supplierName
                                                });
                                            }}
                                            className={`${inputClass} pl-9`}
                                        >
                                            <option value="">Direct Distributor / No Supplier</option>
                                            {suppliers.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Field>

                                <Field label="Storage Location / Bin">
                                    <div className="relative">
                                        <MapPin
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={e => updateField('location', e.target.value)}
                                            placeholder="e.g. Zone A - Shelf 4"
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>
                            </div>

                            <div className="
                                mt-4 flex items-start gap-2.5 rounded-xl
                                border border-blue-100 bg-blue-50/70 p-3
                                dark:border-blue-500/20 dark:bg-blue-500/5
                            ">
                                <Info
                                    size={15}
                                    className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                                />
                                <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300">
                                    Batch number and expiry date help maintain traceability
                                    and support expiry monitoring.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 3: STORAGE AND COMPLIANCE */}
                        <section className="
                            rounded-2xl border border-slate-200
                            bg-white p-4 shadow-sm
                            dark:border-slate-800 dark:bg-slate-900
                            sm:p-5
                        ">
                            <SectionHeader
                                icon={Thermometer}
                                title="Storage & Compliance"
                                description="Environmental requirements and prescription controls"
                                number="03"
                            />

                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <Field label="Storage Condition">
                                    <select
                                        value={formData.storageCondition}
                                        onChange={e => updateField('storageCondition', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value={StorageCondition.AMBIENT}>
                                            {StorageCondition.AMBIENT}
                                        </option>
                                        <option value={StorageCondition.REFRIGERATED}>
                                            {StorageCondition.REFRIGERATED}
                                        </option>
                                        <option value={StorageCondition.FROZEN}>
                                            {StorageCondition.FROZEN}
                                        </option>
                                        <option value={StorageCondition.CONTROLLED}>
                                            {StorageCondition.CONTROLLED}
                                        </option>
                                    </select>
                                </Field>

                                <Field
                                    label="Required Temperature"
                                    hint="Specify the recommended storage temperature"
                                >
                                    <div className="relative">
                                        <Thermometer
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            value={formData.temperatureRequired}
                                            onChange={e => updateField('temperatureRequired', e.target.value)}
                                            placeholder="e.g. 2–8°C"
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>
                            </div>

                            <div className="
                                mt-4 flex items-center justify-between gap-3
                                rounded-xl border border-slate-200
                                bg-slate-50 p-3.5
                                dark:border-slate-700 dark:bg-slate-800/60
                            ">
                                <div className="flex items-center gap-3">
                                    <div className="
                                        flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg bg-amber-50 text-amber-600
                                        dark:bg-amber-500/10 dark:text-amber-400
                                    ">
                                        <ShieldCheck size={18} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                            Prescription Required
                                        </p>
                                        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                                            Mark if this medicine requires a prescription
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={Boolean(formData.requiresPrescription)}
                                    aria-label="Prescription required"
                                    onClick={() => updateField(
                                        'requiresPrescription',
                                        !formData.requiresPrescription
                                    )}
                                    className={`
                                        relative h-6 w-11 shrink-0 rounded-full
                                        transition-colors duration-200
                                        focus-visible:outline-none
                                        focus-visible:ring-4 focus-visible:ring-teal-500/20
                                        ${formData.requiresPrescription
                                            ? 'bg-teal-600 dark:bg-teal-500'
                                            : 'bg-slate-300 dark:bg-slate-600'
                                        }
                                    `}
                                >
                                    <span className={`
                                        absolute top-0.5 h-5 w-5 rounded-full
                                        bg-white shadow-sm transition-all duration-200
                                        ${formData.requiresPrescription
                                            ? 'left-[22px]'
                                            : 'left-0.5'
                                        }
                                    `} />
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* STICKY FOOTER */}
                    <div className="
                        flex shrink-0 items-center justify-between gap-3
                        border-t border-slate-200 bg-white
                        px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900
                        sm:px-6
                    ">
                        <div className="hidden items-center gap-1.5 sm:flex">
                            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                Inventory record
                            </span>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    h-9 rounded-xl border border-slate-200
                                    bg-white px-4 text-xs font-semibold
                                    text-slate-600 transition-all
                                    hover:bg-slate-100 hover:text-slate-900
                                    dark:border-slate-700 dark:bg-slate-800
                                    dark:text-slate-300 dark:hover:bg-slate-700
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="
                                    flex h-9 items-center justify-center gap-2
                                    rounded-xl bg-gradient-to-r
                                    from-teal-600 to-emerald-600
                                    px-4 text-xs font-bold text-white
                                    shadow-md shadow-teal-600/20
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:from-teal-500 hover:to-emerald-500
                                    hover:shadow-lg hover:shadow-teal-600/25
                                    active:translate-y-0 active:scale-[0.98]
                                    dark:from-teal-500 dark:to-emerald-600
                                "
                            >
                                {isEditing ? <Save size={14} /> : <Plus size={15} />}
                                {isEditing ? 'Save Changes' : 'Add Medicine'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


import React, { useState, useEffect } from 'react';
import {
    X,
    Truck,
    Check,
    Key,
    Building2,
    UserRound,
    Mail,
    Phone,
    MapPin,
    Clock3,
    ShieldCheck,
    FileBadge,
    LockKeyhole,
    Sparkles
} from 'lucide-react';

export const AddSupplierModal = ({
    isOpen,
    onClose,
    onSave,
    initialData
}) => {
    const defaultState = {
        name: '',
        contactPerson: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        licenseNumber: `FDA-DIST-${Math.floor(1000 + Math.random() * 9000)}`,
        leadTimeDays: 2,
        rating: 5.0
    };

    const [formData, setFormData] = useState(defaultState);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData ? initialData : defaultState);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const isEditMode = !!initialData;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isEditMode && formData.password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        onSave(formData);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const inputClass = `
        w-full h-10 rounded-xl border border-slate-200
        bg-slate-50 px-3.5 text-xs text-slate-800
        placeholder:text-slate-400 outline-none
        transition-all duration-200
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

    const Field = ({ label, icon: Icon, children, required }) => (
        <div>
            <label className={labelClass}>
                {label}
                {required && <span className="ml-1 text-rose-500">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon
                        size={15}
                        className="
                            pointer-events-none absolute left-3 top-1/2
                            -translate-y-1/2 text-slate-400
                            dark:text-slate-500
                        "
                    />
                )}
                {children}
            </div>
        </div>
    );

    return (
        <div className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-slate-950/60 p-3 backdrop-blur-sm
            animate-fadeIn sm:p-5
        ">
            <div className="
                flex max-h-[94vh] w-full max-w-2xl flex-col
                overflow-hidden rounded-2xl border border-slate-200
                bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]
                dark:border-slate-700 dark:bg-slate-900
                dark:shadow-[0_25px_80px_rgba(0,0,0,0.5)]
            ">

                {/* HEADER */}
                <div className="
                    relative shrink-0 overflow-hidden
                    border-b border-slate-200 bg-white
                    px-5 py-4 dark:border-slate-800 dark:bg-slate-900
                    sm:px-6
                ">
                    <div className="
                        pointer-events-none absolute -right-10 -top-16
                        h-40 w-40 rounded-full bg-teal-500/5 blur-3xl
                    " />

                    <div className="relative flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="
                                flex h-11 w-11 shrink-0 items-center justify-center
                                rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600
                                text-white shadow-lg shadow-teal-600/20
                            ">
                                <Truck size={21} />
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                                        {isEditMode ? 'Edit Supplier' : 'Add New Supplier'}
                                    </h3>

                                    <span className="
                                        rounded-full border border-teal-200
                                        bg-teal-50 px-2 py-0.5
                                        text-[9px] font-bold uppercase tracking-wider
                                        text-teal-700
                                        dark:border-teal-500/20 dark:bg-teal-500/10
                                        dark:text-teal-400
                                    ">
                                        {isEditMode ? 'Update Record' : 'Onboarding'}
                                    </span>
                                </div>

                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    {isEditMode
                                        ? 'Update supplier contact and business information.'
                                        : 'Register a pharmaceutical supplier and configure their account.'
                                    }
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

                    <div className="
                        mt-4 flex items-center gap-2 rounded-xl
                        border border-teal-100 bg-teal-50/70 px-3 py-2.5
                        dark:border-teal-500/20 dark:bg-teal-500/5
                    ">
                        <ShieldCheck
                            size={16}
                            className="shrink-0 text-teal-600 dark:text-teal-400"
                        />
                        <p className="text-[11px] text-teal-800 dark:text-teal-300">
                            Supplier records help maintain reliable procurement and inventory traceability.
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="
                        flex-1 space-y-5 overflow-y-auto
                        bg-slate-50/70 px-5 py-5
                        dark:bg-slate-950/40 sm:px-6
                    ">

                        {/* COMPANY INFORMATION */}
                        <section className="
                            rounded-2xl border border-slate-200
                            bg-white p-4 shadow-sm
                            dark:border-slate-800 dark:bg-slate-900 sm:p-5
                        ">
                            <div className="mb-4 flex items-center gap-2.5">
                                <div className="
                                    flex h-8 w-8 items-center justify-center
                                    rounded-lg bg-teal-50 text-teal-700
                                    dark:bg-teal-500/10 dark:text-teal-400
                                ">
                                    <Building2 size={16} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                        Company Information
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                        Business identity and registration details
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Field label="Company / Distributor Name" icon={Building2} required>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. ABC Pharma Distributors"
                                        value={formData.name}
                                        onChange={e => updateField('name', e.target.value)}
                                        className={`${inputClass} pl-9`}
                                    />
                                </Field>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field label="Contact Representative" icon={UserRound}>
                                        <input
                                            type="text"
                                            placeholder="Contact person's name"
                                            value={formData.contactPerson || ''}
                                            onChange={e => updateField('contactPerson', e.target.value)}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </Field>

                                    <Field label="License / Registration Number" icon={FileBadge}>
                                        <input
                                            type="text"
                                            value={formData.licenseNumber || ''}
                                            onChange={e => updateField('licenseNumber', e.target.value)}
                                            className={`${inputClass} pl-9 font-mono`}
                                        />
                                    </Field>
                                </div>
                            </div>
                        </section>

                        {/* CONTACT DETAILS */}
                        <section className="
                            rounded-2xl border border-slate-200
                            bg-white p-4 shadow-sm
                            dark:border-slate-800 dark:bg-slate-900 sm:p-5
                        ">
                            <div className="mb-4 flex items-center gap-2.5">
                                <div className="
                                    flex h-8 w-8 items-center justify-center
                                    rounded-lg bg-blue-50 text-blue-700
                                    dark:bg-blue-500/10 dark:text-blue-400
                                ">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                        Contact & Address
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                        Official communication and distribution details
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Field label="Official Email Address" icon={Mail} required>
                                    <input
                                        type="email"
                                        required
                                        placeholder="orders@distributor.com"
                                        value={formData.email || ''}
                                        onChange={e => updateField('email', e.target.value)}
                                        className={`${inputClass} pl-9`}
                                    />
                                </Field>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field label="Direct Phone Number" icon={Phone}>
                                        <input
                                            type="text"
                                            placeholder="Enter contact number"
                                            value={formData.phone || ''}
                                            onChange={e => updateField('phone', e.target.value)}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </Field>

                                    <Field label="Average Lead Time (Days)" icon={Clock3}>
                                        <input
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={formData.leadTimeDays || 2}
                                            onChange={e => updateField(
                                                'leadTimeDays',
                                                parseInt(e.target.value) || 2
                                            )}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </Field>
                                </div>

                                <Field label="Distribution Hub Address" icon={MapPin}>
                                    <input
                                        type="text"
                                        placeholder="Street, City, State, PIN Code"
                                        value={formData.address || ''}
                                        onChange={e => updateField('address', e.target.value)}
                                        className={`${inputClass} pl-9`}
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ACCOUNT ACCESS - CREATE ONLY */}
                        {!isEditMode && (
                            <section className="
                                overflow-hidden rounded-2xl
                                border border-amber-200 bg-white shadow-sm
                                dark:border-amber-500/20 dark:bg-slate-900
                            ">
                                <div className="
                                    flex items-center gap-3 border-b
                                    border-amber-100 bg-amber-50/80 px-4 py-3.5
                                    dark:border-amber-500/15 dark:bg-amber-500/5
                                ">
                                    <div className="
                                        flex h-9 w-9 items-center justify-center
                                        rounded-xl bg-amber-100 text-amber-700
                                        dark:bg-amber-500/15 dark:text-amber-400
                                    ">
                                        <LockKeyhole size={17} />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                                            Supplier Account Access
                                        </h4>
                                        <p className="text-[10px] text-amber-700 dark:text-amber-400/80">
                                            Create login credentials for the supplier
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <Field label="Initial Login Password" icon={Key} required>
                                        <input
                                            type="password"
                                            required
                                            minLength="6"
                                            placeholder="Minimum 6 characters"
                                            value={formData.password || ''}
                                            onChange={e => updateField('password', e.target.value)}
                                            className={`
                                                ${inputClass} pl-9
                                                border-amber-200 focus:border-amber-500
                                                focus:ring-amber-500/10
                                                dark:border-amber-500/20
                                                dark:focus:border-amber-400
                                            `}
                                        />
                                    </Field>

                                    <div className="
                                        mt-3 flex items-start gap-2 rounded-lg
                                        bg-amber-50 px-3 py-2.5
                                        dark:bg-amber-500/5
                                    ">
                                        <ShieldCheck
                                            size={14}
                                            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                                        />
                                        <p className="text-[10px] leading-relaxed text-amber-800 dark:text-amber-300">
                                            The supplier will use their registered email and password to log in.
                                            Share credentials securely.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="
                        flex shrink-0 items-center justify-between gap-3
                        border-t border-slate-200 bg-white px-5 py-3.5
                        dark:border-slate-800 dark:bg-slate-900 sm:px-6
                    ">
                        <div className="hidden items-center gap-1.5 sm:flex">
                            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                Supplier registration
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
                                    hover:-translate-y-0.5 hover:from-teal-500
                                    hover:to-emerald-500 hover:shadow-lg
                                    hover:shadow-teal-600/25
                                    active:translate-y-0 active:scale-[0.98]
                                    dark:from-teal-500 dark:to-emerald-600
                                "
                            >
                                {isEditMode ? <Check size={15} /> : <Sparkles size={14} />}
                                {isEditMode ? 'Save Changes' : 'Create Supplier'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';

const TaskForm = ({ initialValues, onSubmit, submitLabel = 'Submit', isEdit = false }) => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'Pending'
      });
    }
  }, [initialValues]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'title') {
      if (!value || value.trim() === '') {
        error = 'Title is required';
      } else if (value.length < 3) {
        error = 'Title must be at least 3 characters long';
      }
    } else if (name === 'description') {
      if (!value || value.trim() === '') {
        error = 'Description is required';
      } else if (value.length < 20) {
        error = 'Description must be at least 20 characters long';
      }
    } else if (name === 'status') {
      if (!value) {
        error = 'Status is required';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const formErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    setErrors(formErrors);
    setTouched({
      title: true,
      description: true,
      status: true
    });

    if (Object.keys(formErrors).length === 0) {
      setSubmitting(true);
      try {
        await onSubmit(values);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ submit: err.message || 'An error occurred' });
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white dark:bg-darkCard p-6 md:p-8 rounded-3xl border border-slate-250 dark:border-darkBorder shadow-sm">
      {errors.submit && (
        <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-400 border border-red-250 dark:border-red-900/30 rounded-xl">
          {errors.submit}
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={submitting}
          placeholder="e.g. Complete Dashboard Development"
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 transition-all duration-205 ${
            errors.title && touched.title
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-darkBorder focus:border-primary-500 focus:ring-primary-500/20'
          }`}
        />
        {errors.title && touched.title && (
          <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={submitting}
          placeholder="Provide a detailed description of the task (minimum 20 characters)..."
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 transition-all duration-250 resize-none ${
            errors.description && touched.description
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-darkBorder focus:border-primary-500 focus:ring-primary-500/20'
          }`}
        />
        {errors.description && touched.description && (
          <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium">
            {errors.description}
          </p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={submitting}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 transition-all duration-200"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          {isEdit && <option value="Completed">Completed</option>}
        </select>
        {errors.status && touched.status && (
          <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium">
            {errors.status}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center py-3.5 px-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader size="small" /> : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, CheckSquare } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && isRegister) {
      if (!value || value.trim() === '') {
        error = 'Name is required';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = 'Email is required';
      } else if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'name' && !isRegister) return;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true
    });

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        if (isRegister) {
          await register(formData.name, formData.email, formData.password);
          toast.success('Registration successful! Please log in.');
          setIsRegister(false);
          setFormData((prev) => ({ ...prev, password: '' }));
          setTouched({});
        } else {
          await login(formData.email, formData.password);
          toast.success('Logged in successfully!');
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        const errMsg = err.response?.data?.message || err.response?.data?.errors?.email || 'Authentication failed';
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 p-4 transition-all duration-300">
      <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-3xl border border-slate-200/60 dark:border-darkBorder shadow-xl p-8 relative overflow-hidden">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-505" />

        {/* Branding logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950/40 text-primary-500 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-3">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isRegister ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRegister ? 'Sign up to start managing your tasks' : 'Log in to access your portal'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field (Register Only) */}
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name && touched.name
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-darkBorder focus:border-primary-500 focus:ring-primary-500/20'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                placeholder="john@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 dark:border-darkBorder focus:border-primary-500 focus:ring-primary-500/20'
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 dark:border-darkBorder focus:border-primary-500 focus:ring-primary-500/20'
                }`}
              />
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl focus:outline-none transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRegister ? (
              'Sign Up'
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Footer toggler */}
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
              setTouched({});
            }}
            disabled={loading}
            className="font-semibold text-primary-500 hover:text-primary-600 hover:underline transition-all"
          >
            {isRegister ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

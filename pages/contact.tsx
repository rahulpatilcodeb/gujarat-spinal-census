import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Contact(): JSX.Element {
  const { t: translate } = useTranslation('common');
  const schema = Yup.object().shape({
    email: Yup.string()
      .required(translate("Email is a required field!") as string)
      .email(translate("Invalid email format!") as string),
    description: Yup.string().required(translate("Please enter description here!") as string),
    contact: Yup.string().required(translate("Please enter your phone number!") as string),
  });
  const router = useRouter();
  const { locales, locale } = useRouter()
  const formik = useFormik({
    initialValues: {
      contact: "",
      email: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  async function handleSubmit() {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, formik.values)
      .then(() => toast.success("We will reach to you soon!"))
      .catch((err: any) => {
        console.error(err);
      });
    // router.push("/");
  }
  function resetAll() {
    formik.values.contact = "";
    formik.values.email = "";
    formik.values.description = "";
  }

  return (
    <><form noValidate className="container w-50" style={{ marginBottom: "7%" }} onSubmit={formik.handleSubmit}>
      <div className="col d-flex justify-content-center">
        <span>
          <b style={{ fontSize: "18px" }}>--Contact Us --</b>
        </span>
      </div>

      <div className="m-3">
        <label className="mb-1">
          {translate('contact number')}
        </label>
        <input
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control bg-light"
          name="contact"
          type="text"
          id="contact"
          placeholder="+91"
          value={formik.values.contact} />
        <p className="error" style={{ color: "red" }}>
          {formik.errors.contact &&
            formik.touched.contact &&
            formik.errors.contact}
        </p>
      </div>
      <div className="m-3">
        <label className="mb-1">
          {translate('e-mail address')}

        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control bg-light"
          name="email"
          type="text"
          id="email"
          value={formik.values.email}
          placeholder={translate('e-mail address') as string} />
        <p style={{ color: "red" }} className="error">
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </p>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="description">
          {translate('Description')}

        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // onChange={handleInputData("description")}
          className="form-control bg-light"
          name="description"
          type="text"
          id="description"
          value={formik.values.description}
          placeholder={translate('Description') as string} />
        <p style={{ color: "red" }} className="error">
          {formik.errors.description &&
            formik.touched.description &&
            formik.errors.description}
        </p>
      </div>

      <div className="d-flex justify-content-end mt-3 me-3">
        <button type="reset" onClick={() => { formik.resetForm(); }} className="btn btn-outline-secondary me-3">
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: "rgba(193, 107, 178, 1)",
            color: "white",
          }}
          className="btn"
          role="button"
        >
          Submit
        </button>
      </div>
    </form>
      <ToastContainer />
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default Contact;

import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
} from "lucide-react";

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-5xl font-bold">
              Contact Us
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              We're always happy to help. Reach out to us through any
              of the contact methods below.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Email */}
            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Mail className="text-blue-600" size={28} />
              </div>

              <h3 className="text-2xl font-semibold">
                Email
              </h3>

              <p className="mt-3 text-gray-500">
                itzmustafa186@gmail.com
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                <Phone className="text-green-600" size={28} />
              </div>

              <h3 className="text-2xl font-semibold">
                Phone
              </h3>

              <p className="mt-3 text-gray-500">
                +92 3091214625
              </p>
            </div>

            {/* Address */}
            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                <MapPin className="text-red-600" size={28} />
              </div>

              <h3 className="text-2xl font-semibold">
                Address
              </h3>

              <p className="mt-3 text-gray-500">
                Karachi, Pakistan
              </p>
            </div>

            
            

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
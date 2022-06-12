import Link from "next/link";

export default function Home() {
  return (
    <div className="items-cente mx-8 my-8 flex h-screen w-full flex-col justify-center">
      <p className="mb-12 text-center text-4xl font-black">Demo version</p>
      <div className="r">
        <p className="mx-auto max-w-[80ch] text-center text-lg">
          This a DEMO version. The real one remains private for my client. Be free to add and modify
          products. Some parts of this demo are not working because, it works with the Retail Store
          TPV.
          <br />
          The purpose of this demo is to show recruiters a live version.
          <br />
          <span className="text-red-600">
            This project was originally made in Spanish, I am working on the translation.
          </span>
        </p>
      </div>
      <Link href="/admin" passHref>
        <button className="boton_update mx-auto mt-12">Go to the admin panel</button>
      </Link>
    </div>
  );
}

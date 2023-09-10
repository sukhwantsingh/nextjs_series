"use client";

export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-purple-700 text-3xl mb-32">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page{" "}
        <span className="border-white rounded-lg bg-orange-500 px-5 text-black py-2 ">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export const dashboardStyles = {
  container:
    "min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-slasherRed px-6 py-8",

  header:
    "text-3xl font-extrabold text-slasherRed mb-4 text-center tracking-tight",

  subheader: "text-center text-gray-400 mb-10 text-sm",

  playlistGrid: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",

  card: "bg-gray-950 border border-gray-800 rounded-xl p-6 shadow-[0_0_30px_rgba(178,34,34,0.3)] flex flex-col",

  cardTitle: "text-lg font-semibold text-white mb-4",

  input:
    "w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slasherRed placeholder-gray-500 transition",

  buttonPrimary:
    "bg-slasherRed hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300",

  buttonSecondary: "text-gray-400 hover:text-white transition text-sm",

  songItem:
    "flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg text-sm text-white",

  logoutWrapper: "mt-10 flex justify-center",

  logoutButton:
    "bg-slasherRed hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300",
};

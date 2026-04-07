import frameworkData from "./framework.json";

    export default function FrameworkList() {
        return (
            <div className="p-8">
                {frameworkData.map((item) => (
                    <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                        <h2 className="text-lg font-bold text-gray-800">
                            {item.name}
                        </h2>

                        <p className="text-gray-600">
                            {item.description}
                        </p>

                        <p className="text-sm text-gray-700 mt-2">
                            Developed by:{" "}
                            <span className="font-semibold">
                                {item.details.developer}
                            </span>{" "}
                            ({item.details.releaseYear})
                        </p>

                        <a
                            href={item.details.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Visit Website
                        </a>

                        <div className="mt-3">
                            {item.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        );
    }
export function PermissionsError() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          ⚠️ Strapi Permissions Not Set
        </h2>
        
        <p className="text-red-700 mb-6">
          The frontend cannot access Strapi data because the <strong>Public role</strong> doesn't have permissions.
        </p>

        <div className="bg-white rounded p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Quick Fix (2 minutes):</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to <a href="http://localhost:1337/admin" className="text-blue-600 underline" target="_blank">Strapi Admin</a></li>
            <li>Click <strong>Settings</strong> (⚙️) → <strong>Roles</strong></li>
            <li>Click <strong>Public</strong> role</li>
            <li>Scroll down and enable:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Blog: <code>find</code> + <code>findOne</code></li>
                <li>Introduction: <code>find</code></li>
                <li>Work-experience: <code>find</code> + <code>findOne</code></li>
              </ul>
            </li>
            <li>Click <strong>Save</strong></li>
            <li>Refresh this page</li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-blue-800">
            📖 See <code>PERMISSIONS_SETUP.md</code> in the project root for detailed instructions with visual guide.
          </p>
        </div>
      </div>
    </div>
  );
}

export function StrapiConnectionError() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">
          ⚠️ Cannot Connect to Strapi
        </h2>
        
        <p className="text-yellow-700 mb-6">
          The frontend cannot connect to the Strapi backend.
        </p>

        <div className="bg-white rounded p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Troubleshooting:</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Check if Strapi is running:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                curl http://localhost:1337/api/blogs
              </pre>
            </li>
            <li>
              <strong>Start Strapi if not running:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                yarn dev:backend
              </pre>
            </li>
            <li>
              <strong>Check environment variables:</strong>
              <p className="ml-6 mt-1 text-sm">
                Verify <code>frontend/.env.local</code> has:
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
                </pre>
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}


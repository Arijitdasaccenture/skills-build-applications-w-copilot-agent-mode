import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead mb-4">
                A modern multi-tier fitness tracking application with a React frontend
                and a Node.js + Express backend connected to MongoDB.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge text-bg-primary">React 19</span>
                <span className="badge text-bg-secondary">Vite</span>
                <span className="badge text-bg-success">Express</span>
                <span className="badge text-bg-dark">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App

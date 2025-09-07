<template>
  <div class="coach-dashboard">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Coach Dashboard</li>
            </ol>
          </nav>
          
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="mb-0">
              <i class="fas fa-chalkboard-teacher me-2"></i>Coach Dashboard
            </h1>
            <button class="btn btn-primary">
              <i class="fas fa-plus me-2"></i>Create New Program
            </button>
          </div>
          
          <!-- Welcome Message -->
          <div class="alert alert-info" v-if="currentUser">
            <h4 class="alert-heading">
              <i class="fas fa-hand-wave me-2"></i>Welcome back, {{ currentUser.firstName }}!
            </h4>
            <p class="mb-0">Manage your programs and track your coaching activities.</p>
          </div>
          
          <!-- Stats Cards -->
          <div class="row mb-4">
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-running fa-2x text-primary mb-2"></i>
                  <h5 class="card-title">Active Programs</h5>
                  <h3 class="text-primary">3</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-users fa-2x text-success mb-2"></i>
                  <h5 class="card-title">Total Participants</h5>
                  <h3 class="text-success">47</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-star fa-2x text-warning mb-2"></i>
                  <h5 class="card-title">Average Rating</h5>
                  <h3 class="text-warning">4.8</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-calendar fa-2x text-info mb-2"></i>
                  <h5 class="card-title">This Week</h5>
                  <h3 class="text-info">6</h3>
                </div>
              </div>
            </div>
          </div>
          
          <!-- My Programs -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-list me-2"></i>My Programs
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Program Name</th>
                      <th>Location</th>
                      <th>Schedule</th>
                      <th>Participants</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Basketball Training</strong>
                        <br><small class="text-muted">Beginner-friendly session</small>
                      </td>
                      <td>Riverside Community Center</td>
                      <td>Mon & Wed 6:00-8:00 PM</td>
                      <td>
                        <span class="badge bg-success">12/15</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="me-1">⭐⭐⭐⭐⭐</span>
                          <small class="text-muted">4.8 (23)</small>
                        </div>
                      </td>
                      <td>
                        <span class="badge bg-success">Active</span>
                      </td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-primary">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-outline-info">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-outline-danger">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Senior Walking Group</strong>
                        <br><small class="text-muted">Gentle walking for seniors</small>
                      </td>
                      <td>Lakeside Park</td>
                      <td>Tue & Fri 9:00-10:30 AM</td>
                      <td>
                        <span class="badge bg-warning">18/20</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="me-1">⭐⭐⭐⭐⭐</span>
                          <small class="text-muted">4.9 (15)</small>
                        </div>
                      </td>
                      <td>
                        <span class="badge bg-success">Active</span>
                      </td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-primary">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-outline-info">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-outline-danger">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Youth Soccer Program</strong>
                        <br><small class="text-muted">Fun soccer for kids</small>
                      </td>
                      <td>Community Field</td>
                      <td>Sat 10:00 AM-12:00 PM</td>
                      <td>
                        <span class="badge bg-info">15/15</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="me-1">⭐⭐⭐⭐⭐</span>
                          <small class="text-muted">4.7 (9)</small>
                        </div>
                      </td>
                      <td>
                        <span class="badge bg-success">Active</span>
                      </td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-primary">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-outline-info">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-outline-danger">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Recent Activity -->
          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-clock me-2"></i>Recent Activity
              </h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fas fa-user-plus text-success me-2"></i>
                    <strong>New participant joined</strong> Basketball Training
                    <br><small class="text-muted">2 hours ago</small>
                  </div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fas fa-star text-warning me-2"></i>
                    <strong>New 5-star rating</strong> for Senior Walking Group
                    <br><small class="text-muted">1 day ago</small>
                  </div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fas fa-calendar text-info me-2"></i>
                    <strong>Session completed</strong> Youth Soccer Program
                    <br><small class="text-muted">2 days ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CoachDashboard',
  computed: {
    ...mapState(['user']),
    currentUser() {
      return this.user || JSON.parse(localStorage.getItem('currentUser') || 'null')
    }
  },
  mounted() {
    // Check if user has coach role
    if (!this.currentUser || this.currentUser.role !== 'coach') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.coach-dashboard {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px 10px 0 0 !important;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 600;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.table th {
  border-top: none;
  font-weight: 600;
  color: #495057;
}

.badge {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #e9ecef;
}

.list-group-item:last-child {
  border-bottom: none;
}

.alert-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
}

.alert-heading {
  color: white;
}
</style>

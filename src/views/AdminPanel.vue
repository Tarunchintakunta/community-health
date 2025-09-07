<template>
  <div class="admin-panel">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Admin Panel</li>
            </ol>
          </nav>
          
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="mb-0">
              <i class="fas fa-cog me-2"></i>Admin Panel
            </h1>
            <div class="btn-group">
              <button class="btn btn-primary">
                <i class="fas fa-plus me-2"></i>Add Program
              </button>
              <button class="btn btn-success">
                <i class="fas fa-user-plus me-2"></i>Add User
              </button>
            </div>
          </div>
          
          <!-- Welcome Message -->
          <div class="alert alert-warning" v-if="currentUser">
            <h4 class="alert-heading">
              <i class="fas fa-shield-alt me-2"></i>Admin Access Granted
            </h4>
            <p class="mb-0">Welcome, {{ currentUser.firstName }}! You have full administrative access to manage programs, users, and system settings.</p>
          </div>
          
          <!-- Admin Stats -->
          <div class="row mb-4">
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-running fa-2x text-primary mb-2"></i>
                  <h5 class="card-title">Total Programs</h5>
                  <h3 class="text-primary">12</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-users fa-2x text-success mb-2"></i>
                  <h5 class="card-title">Total Users</h5>
                  <h3 class="text-success">156</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-chalkboard-teacher fa-2x text-info mb-2"></i>
                  <h5 class="card-title">Coaches</h5>
                  <h3 class="text-info">8</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-star fa-2x text-warning mb-2"></i>
                  <h5 class="card-title">Avg Rating</h5>
                  <h3 class="text-warning">4.6</h3>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Admin Tabs -->
          <ul class="nav nav-tabs mb-4" id="adminTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="programs-tab" data-bs-toggle="tab" data-bs-target="#programs" type="button" role="tab">
                <i class="fas fa-running me-2"></i>Programs Management
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab">
                <i class="fas fa-users me-2"></i>Users Management
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab">
                <i class="fas fa-cog me-2"></i>System Settings
              </button>
            </li>
          </ul>
          
          <div class="tab-content" id="adminTabsContent">
            <!-- Programs Management -->
            <div class="tab-pane fade show active" id="programs" role="tabpanel">
              <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-list me-2"></i>All Programs
                  </h5>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-filter me-1"></i>Filter
                    </button>
                    <button class="btn btn-sm btn-outline-success">
                      <i class="fas fa-download me-1"></i>Export
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Program Name</th>
                          <th>Coach</th>
                          <th>Location</th>
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
                          <td>Mark Johnson</td>
                          <td>Riverside Community Center</td>
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
                          <td>Sarah Williams</td>
                          <td>Lakeside Park</td>
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Users Management -->
            <div class="tab-pane fade" id="users" role="tabpanel">
              <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title mb-0">
                    <i class="fas fa-users me-2"></i>All Users
                  </h5>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-filter me-1"></i>Filter
                    </button>
                    <button class="btn btn-sm btn-outline-success">
                      <i class="fas fa-download me-1"></i>Export
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Age Group</th>
                          <th>Joined</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>John Doe</strong>
                          </td>
                          <td>john.doe@email.com</td>
                          <td>
                            <span class="badge bg-primary">User</span>
                          </td>
                          <td>18-30</td>
                          <td>2024-01-15</td>
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
                                <i class="fas fa-ban"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Sarah Williams</strong>
                          </td>
                          <td>sarah.williams@email.com</td>
                          <td>
                            <span class="badge bg-info">Coach</span>
                          </td>
                          <td>31-45</td>
                          <td>2024-01-10</td>
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
                                <i class="fas fa-ban"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- System Settings -->
            <div class="tab-pane fade" id="settings" role="tabpanel">
              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title mb-0">
                        <i class="fas fa-cog me-2"></i>General Settings
                      </h5>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="mb-3">
                          <label for="siteName" class="form-label">Site Name</label>
                          <input type="text" class="form-control" id="siteName" value="Community Sports Hub">
                        </div>
                        <div class="mb-3">
                          <label for="maxParticipants" class="form-label">Max Participants per Program</label>
                          <input type="number" class="form-control" id="maxParticipants" value="20">
                        </div>
                        <div class="mb-3">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="allowRegistration" checked>
                            <label class="form-check-label" for="allowRegistration">
                              Allow new user registration
                            </label>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title mb-0">
                        <i class="fas fa-chart-bar me-2"></i>System Statistics
                      </h5>
                    </div>
                    <div class="card-body">
                      <div class="row text-center">
                        <div class="col-6">
                          <h4 class="text-primary">156</h4>
                          <p class="text-muted">Total Users</p>
                        </div>
                        <div class="col-6">
                          <h4 class="text-success">12</h4>
                          <p class="text-muted">Active Programs</p>
                        </div>
                        <div class="col-6">
                          <h4 class="text-info">8</h4>
                          <p class="text-muted">Coaches</p>
                        </div>
                        <div class="col-6">
                          <h4 class="text-warning">4.6</h4>
                          <p class="text-muted">Avg Rating</p>
                        </div>
                      </div>
                    </div>
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
  name: 'AdminPanel',
  computed: {
    ...mapState(['user']),
    currentUser() {
      return this.user || JSON.parse(localStorage.getItem('currentUser') || 'null')
    }
  },
  mounted() {
    // Check if user has admin role
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.admin-panel {
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

.nav-tabs .nav-link {
  border: none;
  border-radius: 10px 10px 0 0;
  margin-right: 5px;
  font-weight: 600;
}

.nav-tabs .nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
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

.alert-warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 10px;
}

.alert-heading {
  color: white;
}
</style>

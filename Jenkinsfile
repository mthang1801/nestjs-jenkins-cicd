pipeline {
	agent { docker { image 'node:16.20' } }
	stages { 
		stage('Checkout Code') {
			steps{ 
				checkout scm  
			}       
        }		

		stage("Installation") {
			steps {
				sh "node --version"
				sh "npm install"
			}			
		}

		stage("Test") {						
			steps { 				
				sh "npm test"
			}			
		}
	}
	post {
		success {
			echo "installation success."
		}
		failure {
			echo "installation failed"
		}
	}
}
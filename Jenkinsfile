pipeline {
	agent any 
	 tools {
        docker 'DockerLatest'
		nodejs 'NodeJS16.20'
    }
	stages { 
		stage ("Test") {			
			steps { 
				sh "node --version"
				sh "npm install"
				sh "npm test"
			}
		}
	}
}
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';

export default class ThirdPartyActivity extends React.Component {
	render() {
		return(
			<View style = {{flex: 1}}>
				<AppBar title = "Third-party softwares" backButton = {true} onBackListener = {Actions.pop}/>
				<ScrollView>
					<Text style = {titleStyle}>moment</Text>
					<Text style = {textStyle}>
						Copyright (c) JS Foundation and other contributors{"\n\n\n"}

						Permission is hereby granted, free of charge, to any person
						obtaining a copy of this software and associated documentation
						files (the "Software"), to deal in the Software without
						restriction, including without limitation the rights to use,
						copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the
						Software is furnished to do so, subject to the following
						conditions:{"\n\n"}

						The above copyright notice and this permission notice shall be
						included in all copies or substantial portions of the Software.{"\n\n"}

						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
						EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
						OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
						NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
						HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
						WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
						FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
						OTHER DEALINGS IN THE SOFTWARE.
					</Text>



					<Text style = {titleStyle}>react</Text>
					<Text style = {textStyle}>
						BSD License{"\n\n\n"}

						For React software{"\n\n"}

						Copyright (c) 2013-present, Facebook, Inc.{"\n"}
						All rights reserved.{"\n\n\n"}

						Redistribution and use in source and binary forms, with or without modification,
						are permitted provided that the following conditions are met:{"\n\n"}

						 * Redistributions of source code must retain the above copyright notice, this
						   list of conditions and the following disclaimer.{"\n\n"}

						 * Redistributions in binary form must reproduce the above copyright notice,
						   this list of conditions and the following disclaimer in the documentation
						   and/or other materials provided with the distribution.{"\n\n"}

						 * Neither the name Facebook nor the names of its contributors may be used to
						   endorse or promote products derived from this software without specific
						   prior written permission.{"\n\n\n"}

						THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
						ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
						WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
						DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
						ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
						(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
						LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
						ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
						(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
						SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
					</Text>


					<Text style = {titleStyle}>react-native</Text>
					<Text style = {textStyle}>
						BSD License{"\n\n\n"}

						For React Native software{"\n\n"}

						Copyright (c) 2015-present, Facebook, Inc. All rights reserved.{"\n\n\n"}

						Redistribution and use in source and binary forms, with or without modification,
						are permitted provided that the following conditions are met:{"\n\n"}

						 * Redistributions of source code must retain the above copyright notice, this
						   list of conditions and the following disclaimer.{"\n\n"}

						 * Redistributions in binary form must reproduce the above copyright notice,
						   this list of conditions and the following disclaimer in the documentation
						   and/or other materials provided with the distribution.{"\n\n"}

						 * Neither the name Facebook nor the names of its contributors may be used to
						   endorse or promote products derived from this software without specific
						   prior written permission.{"\n\n"}

						THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
						ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
						WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
						DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
						ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
						(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
						LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
						ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
						(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
						SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
					</Text>


					<Text style = {titleStyle}>react-native-google-signin</Text>
					<Text style = {textStyle}>
						The MIT License (MIT){"\n\n\n"}

						Copyright (c) 2015 Apptailor{"\n\n\n"}

						Permission is hereby granted, free of charge, to any person obtaining a copy
						of this software and associated documentation files (the "Software"), to deal
						in the Software without restriction, including without limitation the rights
						to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the Software is
						furnished to do so, subject to the following conditions:{"\n\n"}

						The above copyright notice and this permission notice shall be included in all
						copies or substantial portions of the Software.{"\n\n"}

						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
						IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
						AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
						LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
						OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
						SOFTWARE.
					</Text>



					<Text style = {titleStyle}>react-native-router-flux</Text>
					<Text style = {textStyle}>
						The MIT License (MIT){"\n\n\n"}

						Copyright (c) 2016 aksonov{"\n\n\n"}

						Permission is hereby granted, free of charge, to any person obtaining a copy
						of this software and associated documentation files (the "Software"), to deal
						in the Software without restriction, including without limitation the rights
						to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the Software is
						furnished to do so, subject to the following conditions:{"\n\n"}

						The above copyright notice and this permission notice shall be included in all
						copies or substantial portions of the Software.{"\n\n"}

						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
						IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
						AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
						LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
						OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
						SOFTWARE.
					</Text>

					<Text style = {titleStyle}>react-redux</Text>
					<Text style = {textStyle}>
						The MIT License (MIT){"\n\n\n"}

						Copyright (c) 2015-present Dan Abramov{"\n\n\n"}

						Permission is hereby granted, free of charge, to any person obtaining a copy
						of this software and associated documentation files (the "Software"), to deal
						in the Software without restriction, including without limitation the rights
						to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the Software is
						furnished to do so, subject to the following conditions:{"\n\n"}

						The above copyright notice and this permission notice shall be included in all
						copies or substantial portions of the Software.{"\n\n"}

						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
						IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
						AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
						LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
						OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
						SOFTWARE.
					</Text>


					<Text style = {titleStyle}>underscore</Text>
					<Text style = {textStyle}>
						Copyright (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative{"\n"}
						Reporters & Editors{"\n\n\n"}

						Permission is hereby granted, free of charge, to any person
						obtaining a copy of this software and associated documentation
						files (the "Software"), to deal in the Software without
						restriction, including without limitation the rights to use,
						copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the
						Software is furnished to do so, subject to the following
						conditions:{"\n\n"}

						The above copyright notice and this permission notice shall be
						included in all copies or substantial portions of the Software.{"\n\n"}

						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
						EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
						OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
						NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
						HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
						WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
						FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
						OTHER DEALINGS IN THE SOFTWARE.
					</Text>
				</ScrollView>
				
			</View>
		);
	}
}

const textStyle = {
	color: '#757575',
	fontSize: 17,
	paddingLeft: 40,
	paddingRight: 40,
	paddingTop: 20,
	paddingBottom: 50
}

const titleStyle = {
	color: ColorScheme.text,
	fontSize: 25,
	paddingTop: 30,
	paddingLeft: 40,
	paddingRight: 40
}
<template>
	<div class="container mt-4">
		<div class="row">
			<div class="col-md-12">
				<div class="card text-right">
					<div class="card-header">
						<H3>
							اضافه فيديو جديد
						</H3>
						<hr />
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form @submit.prevent="handleSubmit(onSubmit())">
								<div class="form-group">
									<validation-provider
										name="video"
										:bails="false"
										rules="required|max:255|min:2 "
										v-slot="{ errors, classes }"
									>
										<div :class="classes">
											<label for="exampleInputEmail1"> العنوان</label>
											<input
												type="text"
												class="form-control"
												id="exampleInputEmail1"
												aria-describedby="emailHelp"
												v-model="video"
											/>
											<h6 class="mt-3">{{ errors[0] }}</h6>
										</div>
									</validation-provider>
								</div>
								<div
									v-model="download"
									@click="download = !download"
									class="form-group form-check rtl p-1"
								>
									<input
										type="checkbox"
										class="form-check-input"
										id="exampleCheck"
									/>
									<label class="form-check-label  px-1" for="exampleCheck1"
										>اسمح للطلاب بالتحميل</label
									>
								</div>
								<div class="form-group rtl">
									<validation-provider
										name="description"
										:bails="false"
										rules="max:1000"
										v-slot="{ errors, classes }"
									>
										<div :class="classes">
											<label for="exampleFormControlTextarea1">الوصف</label>
											<textarea
												class="form-control"
												id="exampleFormControlTextarea1"
												rows="3"
												v-model="description"
											></textarea>
											<h6 class="mt-3">{{ errors[0] }}</h6>
										</div>
									</validation-provider>
								</div>
								<div class="add-video mb-4">
									<img
										@click="(youtube = !youtube), getVideoType()"
										class="img-fluid mx-2"
										src="../../src/assets/download (1).png"
										alt=""
									/>
									<img
										@click="(vimeo = !vimeo), getVideoType()"
										class="img-fluid"
										src="../../src\assets\0.jpg"
										alt=""
									/>

									<img
										@click="uplode = !uplode"
										class="img-fluid"
										src="../../src\assets\download.png"
										alt=""
									/>
								</div>

								<div v-show="youtube" class=" mb-4">
									<img src="../../src/assets/201902281057195719.jpg" alt="" />
									<input
										type="text"
										class="form-control youtube mt-2"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										v-model="youtubeVideo"
									/>
								</div>

								<div v-show="vimeo" class="  mb-4">
									<img src="../../src\assets\0.jpg" alt="" />
									<input
										type="text"
										class="form-control vimeo mt-2"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										v-model="vimeoVideo"
									/>
								</div>

								<div v-show="uplode" class="form-group rtl">
									<label
										>اختار الملف
										<input
											type="file"
											id="file"
											ref="file"
											accept="video/*"
											v-on:change="handleFileUpload()"
										/>
									</label>
								</div>
								<div class="form-group rtl mt-2">
									<label for="exampleFormControlTextarea1">تاريخ النشر</label>
									<div>
										<validation-provider
											name="datepicker"
											:bails="false"
											rules=""
											v-slot="{ errors, classes }"
										>
											<div :class="classes">
												<datepicker
													:input-style="{
														'width': '100%',
														'border-radius': '5px'
													}"
													class="col-md-12 p-0"
													format="YYYY-M-D"
													name="date"
												>
												</datepicker>
												<h6 class="mt-3">{{ errors[0] }}</h6>
											</div>
										</validation-provider>
									</div>
								</div>
								<div class="form-group rtl">
									<label for="exampleFormControlTextarea1">التحاضيرات</label>
									<select v-model="selected" class="form-control">
										<label for="exampleFormControlTextarea1">{{
											selected
										}}</label>
										<option
											v-for="(option, i) in Preparinglist"
											:key="i"
											:value="option"
										>
											{{ option }}
										</option>
									</select>
								</div>
								<div class="form-group rtl">
									<label for="exampleFormControlTextarea1">وسوم</label>

									<div class="input-group">
										<vue-tags-input
											v-model="tag"
											class="col-md-8"
											placeholder="وسوم"
											@tags-changed="(newTags) => (tags = newTags)"
										/>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<div class="form-group rtl">
											<label for="exampleFormControlTextarea1"
												>المشاركه في</label
											>
											<select v-model="Publish" class="form-control">
												<option v-for="(Publish, i) in PublishIn" :key="i"
													>{{ Publish }}
												</option>
											</select>
											<label for="exampleFormControlTextarea1"
												>المشاركه المحتوي ف المكتبات المتخصصه</label
											>
											<select v-model="librarie" class="form-control">
												<option
													v-for="(librarie, i) in Customlibraries"
													:key="i"
													>{{ librarie }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-4">
										<div
											class="form-group form-check rtl p-1"
											v-model="shareable"
											@click="shareable = !shareable"
										>
											<input
												type="checkbox"
												class="form-check-input"
												id="example"
											/>
											<label class="form-check-label  px-1" for="exampleCheck1">
												قم بنشرها علي يومياتي</label
											>
										</div>
									</div>
								</div>
								<div class="card-footer text-muted p-4">
									<h4>
										مشاركه المحتوي مع الطلاب
									</h4>
									<p>
										يجب اخيار قسم واحد علي الاقل
									</p>

									<div class="form-group rtl">
										<!-- Check All -->
										<input
											type="checkbox"
											@click="checkAll()"
											v-model="isCheckAll"
										/>
										<label
											v-model="Students"
											class="form-check-label  px-1"
											for="exampleCheck1"
										>
											اختيار الكل</label
										>

										<ul class="list-group">
											<li
												class="list-group d-block"
												v-for="(Student, i) in ClassStudents"
												:key="i"
											>
												<input
													type="checkbox"
													class="mr-3"
													:value="Student"
													v-model="Students"
													@change="updateCheckall()"
												/>{{ Student }}
											</li>
										</ul>
									</div>
								</div>

								<button type="submit" class="btn mt-4">
									اضافه
								</button>
							</form>
						</ValidationObserver>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import datepicker from 'vue-date-picker';
	import VueTagsInput from '@johmun/vue-tags-input';
	import vue2Dropzone from 'vue2-dropzone';
	import 'vue2-dropzone/dist/vue2Dropzone.min.css';

	export default {
		data() {
			return {
				youtube: false,
				uplode: false,
				vimeo: false,
				file: '',
				videoType: '',
				video_url: '',
				vimeoVideo: '',
				youtubeVideo: '',
				tag: '',
				tags: [],
				checked: true,
				isCheckAll: false,
				Students: [],
				Student: '',
				video: '',
				value: '',
				// pickedValue: '',
				description: '',
				shareable: false,
				download: false,
				selected: 'please select',
				subject_id: 1,
				Publish: '',
				PublishIn: ['Public library', 'Schools', 'Nothing'],
				Preparinglist: {},
				librarie: '',
				// dropzoneOptions: {
				// 	url: 'https://roles.viewclass.com/api/library.video.create',
				// 	thumbnailWidth: 400,
				// 	maxFilesize: 200,
				// 	addRemoveLinks: true

				// 	// headers: { 'My-Awesome-Header': 'header value' }
				// },
				Customlibraries: [],
				ClassStudents: []
			};
		},
		created() {
			this.getPreparinglist();
			this.getCustomlibraries();
			this.getClassStudents();
			// this.getVideoType();
		},
		watch: {
			data(newValue) {
				this.videoType = newValue;
				console.log(this.videoType);
			}
		},
		components: {
			datepicker,
			VueTagsInput,
			vueDropzone: vue2Dropzone
		},
		methods: {
			getPreparinglist() {
				console.log(this.selected);
				this.$axios
					.get('preparing.list/', {
						params: {
							subject_id: this.subject_id
						}
					})
					.then(
						(response) => {
							const Preparinglist = (this.Preparinglist = response.data[1]);
							console.log(this.Preparinglist[1].indexOf[1]);
						},
						(error) => {
							console.log(error);
						}
					);
			},
			getCustomlibraries() {
				this.$axios.get('custom-libraries.list/').then(
					(response) => {
						const Customlibraries = (this.Customlibraries = response.data[1]);
						// console.log(Customlibraries);
					},
					(error) => {
						console.log(error);
					}
				);
			},
			getClassStudents() {
				console.log('here11');
				this.$axios
					.get('class.students.list/', {
						params: {
							class_id: this.subject_id
						}
					})
					.then(
						(response) => {
							const ClassStudents = (this.ClassStudents = response.data[1]);
							// console.log(ClassStudents);
						},
						(error) => {
							console.log(error);
						}
					);
			},

			onSubmit() {
				alert('Form has been submitted!');
				let formData = new FormData();
				console.log(formData);
				formData.append('file', this.file);

				this.$axios
					.post(
						'library.video.create/',
						formData,
						{
							params: {
								title: this.video,
								can_students_download: this.download,
								// publish_date: this.pickedValue,
								preparation_id: this.selected,
								tags: this.tags,
								publish_timeline: this.shareable,
								sharing_with: this.Publish,
								publish_custom_library: this.Customlibraries,
								classes: this.ClassStudents,
								students: this.Students,
								subject_id: this.subject_id,
								video_type: this.videoType,
								video_url: this.video_url,
								video_file: this.file
							}
						},
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					)
					.then((response) => {
						console.log(response);
					});
			},
			checkAll() {
				this.isCheckAll = !this.isCheckAll;
				this.Students = [];
				if (this.isCheckAll) {
					// Check all
					for (var key in this.ClassStudents) {
						this.Students.push(this.ClassStudents[key]);
					}
				}
			},
			updateCheckall() {
				if (this.Students.length == this.ClassStudents.length) {
					this.isCheckAll = true;
				} else {
					this.isCheckAll = false;
				}
			},
			getVideoType() {
				if (this.youtube == true) {
					this.videoType = 'youtube';
					const youtube = document.querySelector('.youtube');
					youtube.addEventListener('blur', () => {
						this.video_url = this.youtubeVideo;
					});

					console.log(this.video_url);
				} else if (this.vimeo == true) {
					this.videoType = 'vimeo';
					const vimeo = document.querySelector('.vimeo');
					vimeo.addEventListener('blur', () => {
						this.video_url = this.vimeoVideo;
					});
					this.video_url = this.vimeoVideo;
				} else {
					this.videoType = '';
				}
			},
			handleFileUpload() {
				this.file = this.$refs.file.files[0];
			},
			submitFile() {
				axios
					.post('/single-file', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(function() {
						console.log('SUCCESS!!');
					})
					.catch(function() {
						console.log('FAILURE!!');
					});
			}
		}
	};
</script>

<style lang="scss">
	@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	.ti-tag,
	.btn {
		background: #45d4ff !important;
		color: #fff !important;
	}
	.vue-tags-input .ti-input,
	.card-footer {
		border-radius: 5px;
	}
	.invalid input {
		border: 1px solid red;
	}
	.invalid h6 {
		color: red;
	}
	img {
		width: 115px !important;
		height: 115px !important;
		cursor: pointer;
	}
	.dz-preview.dz-file-preview.dz-processing {
		display: flex;
		flex-wrap: nowrap;
		min-height: 179px;
	}
	input[type='file']::-webkit-file-upload-button {
		text-align: left;
		background-color: #45d4ff;
		color: #fff;
		border: none;
		border-radius: 10px;
		padding: 10px 20px;
	}
</style>

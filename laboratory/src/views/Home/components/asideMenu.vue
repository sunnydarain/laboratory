<script>
	export default {
		name: 'asideMenu',
		props: {
			menuData: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				currentPath: []
			}
		},
		created() {
			// console.log(this.$route.path)
			this.currentPath = [this.$route.path]
		},
		methods: {
			apendMenuItem(item) {
				if(Object.is(item.children.length, 0)) {
					return (
						<a-menu-item key={item.key} onClick={() => this.itemHandle(item.path)}>
							<a-icon type="desktop"></a-icon>
							<span>{item.name}</span>
						</a-menu-item>
					)
				}
				if(item.children) {
					return (
						<a-sub-menu key={item.key}>
							<span slot="title"><a-icon type="desktop" /><span>{item.name}</span></span>
							{
								item.children.map(v => this.apendMenuItem(v))
							}
						</a-sub-menu>
					)
				}
			},
			itemHandle(path) {
				this.$router.push({path: path})
			}
		},
		render() {
			return (<a-menu default-selected-keys={this.currentPath} default-open-keys={['sub1']} mode="inline" theme="dark" inline-collapsed={false}>
				{
					this.menuData.map(v => this.apendMenuItem(v))
				}
			</a-menu>)
		}
	}
</script>
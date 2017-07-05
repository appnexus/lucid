import React from 'react';
import createClass from 'create-react-class';
import { Banner, Icon } from '../../../index';

const CustomIcon = createClass({
	render() {
		return (
			<Icon size={18} viewBox="0 0 22 22">
				<path
					fill="#000000"
					d="M11,0A11,11,0,1,0,22,11,11,11,0,0,0,11,0Zm2.29,17q-0.85.34-1.35,0.51a3.57,3.57,0,0,1-1.18.18,2.34,2.34,0,0,1-1.6-.5A1.62,1.62,0,0,1,8.59,16a4.62,4.62,0,0,1,0-.61c0-.21.07-0.44,0.14-0.71l0.71-2.5c0.06-.24.12-0.47,0.16-0.68a3,3,0,0,0,.06-0.59,0.91,0.91,0,0,0-.2-0.67A1.12,1.12,0,0,0,8.75,10a2,2,0,0,0-.56.08l-0.49.16,0.19-.77Q8.57,9.2,9.21,9a3.93,3.93,0,0,1,1.2-.2A2.3,2.3,0,0,1,12,9.29a1.64,1.64,0,0,1,.55,1.28q0,0.16,0,.57a3.84,3.84,0,0,1-.14.76l-0.7,2.5c-0.06.2-.11,0.43-0.16,0.69a3.62,3.62,0,0,0-.07.58,0.84,0.84,0,0,0,.22.68,1.25,1.25,0,0,0,.77.18A2.23,2.23,0,0,0,13,16.44a3.31,3.31,0,0,0,.47-0.16ZM13.16,6.92A1.68,1.68,0,0,1,12,7.38a1.7,1.7,0,0,1-1.19-.46,1.46,1.46,0,0,1-.5-1.11,1.48,1.48,0,0,1,.5-1.11A1.69,1.69,0,0,1,12,4.23a1.67,1.67,0,0,1,1.19.46A1.5,1.5,0,0,1,13.16,6.92Z"
				/>
			</Icon>
		);
	},
});

export default createClass({
	render() {
		return (
			<div>
				<div>
					<Banner style={{ marginBottom: 8 }}>Default</Banner>
					<Banner hasRoundedCorners={false} style={{ marginBottom: 8 }}>
						Default no rounded corners
					</Banner>
					<Banner isCloseable={false} style={{ marginBottom: 8 }}>
						Default -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner isSmall={true} style={{ marginBottom: 8 }}>
						Default -- small
					</Banner>
					<Banner
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Default -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind="primary" style={{ marginBottom: 8 }}>Primary</Banner>
					<Banner
						kind="primary"
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Primary -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="primary" isSmall={true} style={{ marginBottom: 8 }}>
						Primary -- small
					</Banner>
					<Banner
						kind="primary"
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Primary -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind="success" style={{ marginBottom: 8 }}>Success</Banner>
					<Banner
						kind="success"
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Success -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="success" hasIcon={true} style={{ marginBottom: 8 }}>
						Success -- has icon
					</Banner>
					<Banner
						kind="success"
						hasIcon={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Success -- has icon -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner
						kind="success"
						isSmall={true}
						hasIcon={true}
						style={{ marginBottom: 8 }}
					>
						Success -- has icon -- small
					</Banner>
					<Banner
						kind="success"
						isSmall={true}
						hasIcon={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Success -- has icon -- No Close
						{' '}
						{String.fromCharCode(0x00d7)}
						{' '}
						-- small
					</Banner>
					<Banner kind="success" isSmall={true} style={{ marginBottom: 8 }}>
						Success -- small
					</Banner>
					<Banner
						kind="success"
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Success -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="success" hasIcon={true} style={{ marginBottom: 8 }}>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius neque veniam nisi aspernatur, quos dolorem aut praesentium eaque consequatur inventore adipisci, architecto atque ipsa, laudantium laboriosam ipsam non vitae, cum maiores hic. Laboriosam fugiat eveniet quos assumenda delectus aperiam excepturi vel, officia sint reiciendis expedita consequuntur, a sed deleniti commodi rerum natus quam veniam earum quibusdam! Nemo iusto asperiores sit velit eveniet quod nam. Voluptatibus beatae maxime, quia a velit praesentium vel vitae consectetur, libero nulla magni voluptatum facilis ea facere, minus doloribus. Excepturi veniam, mollitia esse aut illum ad tenetur facere quidem. Ipsum odio, dolore, error rem assumenda debitis.
						</p>
						<p>
							Culpa a facilis facere, ipsum eveniet, minima nisi ipsam perspiciatis aut nostrum autem delectus natus, error obcaecati. Deleniti, illo, nulla. Maiores similique accusantium sint ullam deleniti provident, ratione debitis neque a iusto placeat, explicabo quia assumenda minus amet suscipit modi odit voluptatem soluta. Quas consectetur accusantium iure magni velit, rem quasi sunt corrupti nisi, fugit quos beatae. Laborum impedit cum soluta facere consequuntur nisi nostrum enim. Eius incidunt ratione excepturi harum explicabo quos recusandae sequi, facere tenetur in ducimus impedit sunt sapiente accusamus laborum quae velit minus neque. Perferendis, ducimus nihil dolor placeat libero nisi adipisci autem et fugit commodi?
						</p>
						<p>
							Eos ut odio, perspiciatis ad delectus. Inventore officiis rem quisquam magni. Amet, doloremque? Eveniet laborum labore, quod enim repellat, omnis voluptates, quasi non nostrum dolores ut perspiciatis facilis sint dolorum, minima reprehenderit? Vitae ipsam, similique et quisquam. Molestias, eaque. Expedita eligendi, saepe facere tempore doloremque earum incidunt esse labore nobis amet odio, deserunt voluptate eius blanditiis ullam consequuntur maxime reprehenderit dolorem recusandae eos voluptas! Harum dolorum in, quo, dolore minima commodi laudantium beatae enim dolorem, aspernatur quaerat libero cupiditate repellendus. Ullam perferendis tempore autem quos officiis, natus a accusamus odit ut sint culpa. Quos sunt eos, magnam aliquam, adipisci consectetur.
						</p>
					</Banner>
				</div>

				<div>
					<Banner kind="warning" style={{ marginBottom: 8 }}>Warning</Banner>
					<Banner
						kind="warning"
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Warning -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="warning" hasIcon={true} style={{ marginBottom: 8 }}>
						Warning -- has icon
					</Banner>
					<Banner
						kind="warning"
						hasIcon={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Warning -- has iconv
					</Banner>
					<Banner kind="warning" isSmall={true} style={{ marginBottom: 8 }}>
						Warning -- small
					</Banner>
					<Banner
						kind="warning"
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Warning -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner
						kind="warning"
						hasIcon={true}
						isSmall={true}
						style={{ marginBottom: 8 }}
					>
						Warning -- has icon -- small
					</Banner>
					<Banner
						kind="warning"
						hasIcon={true}
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Warning -- has icon -- small -- No Close
						{' '}
						{String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind="danger" style={{ marginBottom: 8 }}>Danger</Banner>
					<Banner kind="danger" isCloseable={false} style={{ marginBottom: 8 }}>
						Danger -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="danger" hasIcon={true} style={{ marginBottom: 8 }}>
						Danger -- has icon
					</Banner>
					<Banner
						kind="danger"
						hasIcon={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Danger -- has icon -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="danger" isSmall={true} style={{ marginBottom: 8 }}>
						Danger -- small
					</Banner>
					<Banner
						kind="danger"
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Danger -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner
						kind="danger"
						hasIcon={true}
						isSmall={true}
						style={{ marginBottom: 8 }}
					>
						Danger -- has icon -- small
					</Banner>
					<Banner
						kind="danger"
						hasIcon={true}
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Danger -- has icon -- small -- No Close
						{' '}
						{String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind="info" style={{ marginBottom: 8 }}>Info</Banner>
					<Banner kind="info" isCloseable={false} style={{ marginBottom: 8 }}>
						Info -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="info" hasIcon={true} style={{ marginBottom: 8 }}>
						Info -- has icon
					</Banner>
					<Banner
						kind="info"
						hasIcon={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Info -- has icon -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner kind="info" isSmall={true} style={{ marginBottom: 8 }}>
						Info -- small
					</Banner>
					<Banner
						kind="info"
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Info -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
					<Banner
						kind="info"
						hasIcon={true}
						isSmall={true}
						style={{ marginBottom: 8 }}
					>
						Info -- has icon -- small
					</Banner>
					<Banner
						kind="info"
						hasIcon={true}
						isSmall={true}
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Info -- has icon -- small -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner
						style={{ marginBottom: 8 }}
						icon={<CustomIcon />}
						kind="danger"
					>
						Has Custom Icon
					</Banner>
				</div>

				<div>
					<Banner style={{ marginBottom: 8 }} icon={<CustomIcon />}>
						<p>
							<strong>Has Custom Icon</strong>
							{' '}
							ipsum dolor sit amet, consectetur adipisicing elit. A doloribus, fugit atque. Impedit neque perferendis libero nam, deserunt inventore aliquid quis molestiae est! In perferendis dignissimos ex optio cupiditate quae!
						</p>
					</Banner>
				</div>

				<div>
					<Banner style={{ marginBottom: 8 }} icon={<CustomIcon />}>
						<p>
							<strong>Has Custom Icon</strong>
							{' '}
							ipsum dolor sit amet, consectetur adipisicing elit. A doloribus, fugit atque. Impedit neque perferendis libero nam, deserunt inventore aliquid quis molestiae est! In perferendis dignissimos ex optio cupiditate quae!
						</p>
						<p>
							Velit, architecto, commodi. Non porro cupiditate rerum obcaecati veniam alias fugiat nam similique, labore a quis magni vero consequatur consequuntur veritatis est quibusdam tempora tempore ex, deleniti dicta inventore. Quas.
						</p>
					</Banner>
				</div>

			</div>
		);
	},
});

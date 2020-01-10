
/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CustomGradientBar from './custom-gradient-bar';
import BaseControl from '../base-control';
import { getGradientParsed } from './utils';
import { serializeGradient } from './serializer';
import ToolbarGroup from '../toolbar-group';

const AnglePicker = withInstanceId(
	( { value, onChange, instanceId } ) => {
		const inputId = `custom-gradient-picker__angle-picker-${ instanceId }`;
		return (
			<BaseControl
				label={ __( 'Angle' ) }
				id={ inputId }
				className="custom-gradient-picker__angle-picker"
			>
				<input
					className="custom-gradient-picker__angle-picker-field"
					type="number"
					id={ inputId }
					onChange={ ( event ) => {
						const unprocessedValue = event.target.value;
						const inputValue = unprocessedValue !== '' ?
							parseInt( event.target.value, 10 ) :
							0;
						onChange( inputValue );
					} }
					value={ value }
					min={ 0 }
					max={ 360 }
					step="1"
				/>
			</BaseControl>
		);
	}
);

const GradientAnglePicker = ( { gradientAST, hasGradient, onChange } ) => {
	const angle = gradientAST.orientation.value;
	const onAngleChange = ( newAngle ) => {
		onChange( serializeGradient( {
			...gradientAST,
			orientation: {
				...gradientAST.orientation,
				value: newAngle,
			},
		} ) );
	};
	return (
		<AnglePicker
			value={ hasGradient ? angle : '' }
			onChange={ onAngleChange }
		/>
	);
};

const GradientTypePicker = ( { gradientAST, hasGradient, onChange } ) => {
	return (
		<BaseControl className="custom-gradient-picker__type-picker">
			<BaseControl.VisualLabel>
				{ __( 'Type' ) }
			</BaseControl.VisualLabel>
			<ToolbarGroup
				controls={ [
					{
						icon: (
							<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<linearGradient y2="0" x2="0.5" y1="1" x1="0.5" id="svg_1">
										<stop offset="0" stopColor="#000000" />
										<stop offset="1" stopColor="#fff" />
									</linearGradient>
								</defs>
								<g>
									<rect fill="url(#svg_1)" id="canvas_background" height="20" width="20" y="-1" x="-1" />
								</g>
							</svg>
						),
						title: 'Linear Gradient',
						isActive: false,
					},
					{
						icon: (
							<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<radialGradient cy="0.5" cx="0.5" spreadMethod="pad" id="svg_2">
										<stop offset="0" stopColor="#fff" />
										<stop offset="1" stopColor="#000000" />
									</radialGradient>
								</defs>
								<g>
									<rect fill="url(#svg_2)" id="canvas_background" height="20" width="20" y="-1" x="-1" />
								</g>
							</svg>
						),
						title: 'Radial Gradient',
						isActive: true,
					},
				] }
			/>
		</BaseControl>
	);
};

export default function CustomGradientPicker( { value, onChange } ) {
	const { gradientAST, hasGradient } = getGradientParsed( value );
	console.log( gradientAST );
	return (
		<div className="custom-gradient-picker">
			<CustomGradientBar
				value={ value }
				onChange={ onChange }
			/>
			<div className="custom-gradient-picker__ui-line">
				<GradientTypePicker
					gradientAST={ gradientAST }
					hasGradient={ hasGradient }
					onChange={ onChange }
				/>
				<GradientAnglePicker
					gradientAST={ gradientAST }
					hasGradient={ hasGradient }
					onChange={ onChange }
				/>
			</div>
		</div>
	);
}
